import json
import uuid
from fastapi import APIRouter
from fastapi.responses import StreamingResponse
from app.agents.graph import build_graph

router = APIRouter()
graph = build_graph()

NODE_DISPLAY = {
    "researcher": {
        "title": "Gathering research", "role": "RESEARCHER",
        "tag": "Searched", "tagType": "success",
        "description": "Queried live web sources and local document store for relevant information.",
    },
    "fact_checker": {
        "title": "Verifying claims", "role": "FACT-CHECKER",
        "tag": "Verified", "tagType": "success",
        "description": "Cross-checked research notes and filtered out weak or unsupported claims.",
    },
    "summarizer": {
        "title": "Summarizing findings", "role": "SUMMARIZER",
        "tag": "Condensed", "tagType": "success",
        "description": "Organized verified facts into a clear, structured set of key points.",
    },
    "writer": {
        "title": "Writing final report", "role": "WRITER",
        "tag": "Drafted", "tagType": "success",
        "description": "Composed the final structured report from the summary.",
    },
}


def sse(obj: dict) -> str:
    """One event = one line of JSON. TaskExecutionView.tsx reads the stream line by line."""
    return json.dumps(obj) + "\n"


def describe_error(e: Exception) -> str:
    """Short, readable error text that is safe to show in the UI."""
    return f"{type(e).__name__}: {str(e)[:300]}"


# ---------------------------------------------------------------
# /start: runs the planner, then pauses until the user approves
# ---------------------------------------------------------------
async def start_stream(query: str, thread_id: str):
    initial_state = {
        "query": query, "plan": [], "research_notes": [],
        "verified_facts": [], "summary": "", "final_report": "",
    }
    config = {"configurable": {"thread_id": thread_id}}

    try:
        async for update in graph.astream(initial_state, config=config, stream_mode="updates"):
            for node_name, node_output in update.items():
                if node_name == "planner":
                    yield sse({"type": "plan", "data": node_output.get("plan", [])})
    except Exception as e:
        print(f"[ERROR] /start failed -> {describe_error(e)}", flush=True)
        yield sse({"type": "error", "data": describe_error(e)})
        return

    # Graph is now paused right before "researcher": tell the frontend to wait for approval
    yield sse({"type": "awaiting_approval", "data": {"thread_id": thread_id}})


@router.post("/api/orchestrate/start")
async def orchestrate_start(payload: dict):
    query = payload.get("query", "")
    thread_id = str(uuid.uuid4())
    return StreamingResponse(start_stream(query, thread_id), media_type="application/x-ndjson")


# ---------------------------------------------------------------
# /resume: runs everything after the user clicks "Approve & Run"
# ---------------------------------------------------------------
async def resume_stream(thread_id):
    if not thread_id:
        yield sse({"type": "error", "data": "No session id was sent. Please ask your question again."})
        return

    config = {"configurable": {"thread_id": thread_id}}

    try:
        snapshot = await graph.aget_state(config)
    except Exception as e:
        print(f"[ERROR] /resume could not read session -> {describe_error(e)}", flush=True)
        yield sse({"type": "error", "data": describe_error(e)})
        return

    # A paused session has a "next" step waiting. If it is empty, the session is gone
    # (server restarted) or the run already finished (e.g. Approve clicked twice).
    if not snapshot.next:
        yield sse({
            "type": "error",
            "data": "This session is no longer available (the server restarted, or the run already finished). Please ask your question again.",
        })
        return

    final_state = None

    try:
        async for update in graph.astream(None, config=config, stream_mode="updates"):
            for node_name, node_output in update.items():
                if node_name.startswith("__"):
                    continue  # internal LangGraph markers such as __interrupt__

                if node_name == "contradiction_checker":
                    found = node_output.get("contradictions", [])
                    has_conflicts = len(found) > 0
                    yield sse({
                        "type": "step",
                        "data": {
                            "status": "warning" if has_conflicts else "success",
                            "title": "Checking for contradictions",
                            "role": "CONTRADICTION-CHECKER",
                            "tag": f"{len(found)} Conflict(s) Resolved" if has_conflicts else "No Conflicts",
                            "tagType": "warning" if has_conflicts else "success",
                            "description": (
                                "Found facts that disagree with each other and removed the weaker or unresolvable ones: "
                                + " | ".join(found)
                                if has_conflicts else
                                "No direct contradictions found between verified facts."
                            ),
                        },
                    })

                elif node_name == "groundedness_checker":
                    has_warning = node_output.get("has_unverified_claims", False)
                    yield sse({
                        "type": "step",
                        "data": {
                            "status": "warning" if has_warning else "success",
                            "title": "Checking groundedness",
                            "role": "GROUNDEDNESS-CHECKER",
                            "tag": "Unverified Claims Found" if has_warning else "All Claims Verified",
                            "tagType": "warning" if has_warning else "success",
                            "description": (
                                "Some claims in the report could not be traced to a verified source, flagged inline."
                                if has_warning else
                                "Every claim in the report traces back to a verified source."
                            ),
                        },
                    })

                else:
                    info = NODE_DISPLAY.get(node_name)
                    if info:
                        yield sse({
                            "type": "step",
                            "data": {
                                "status": "success", "title": info["title"], "role": info["role"],
                                "tag": info["tag"], "tagType": info["tagType"], "description": info["description"],
                            },
                        })

                final_state = node_output
    except Exception as e:
        print(f"[ERROR] /resume failed -> {describe_error(e)}", flush=True)
        yield sse({"type": "error", "data": describe_error(e)})
        return

    report_text = ""
    if final_state:
        report_text = final_state.get("flagged_report") or final_state.get("final_report", "")
    yield sse({"type": "report", "data": report_text})
    yield sse({"type": "done"})


@router.post("/api/orchestrate/resume")
async def orchestrate_resume(payload: dict):
    thread_id = payload.get("thread_id")
    return StreamingResponse(resume_stream(thread_id), media_type="application/x-ndjson")