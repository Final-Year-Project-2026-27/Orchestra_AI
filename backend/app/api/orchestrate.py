import json
from fastapi import APIRouter
from fastapi.responses import StreamingResponse
from app.agents.graph import build_graph

router = APIRouter()
graph = build_graph()

NODE_DISPLAY = {
    "researcher": {
        "title": "Gathering research",
        "role": "RESEARCHER",
        "tag": "Searched",
        "tagType": "success",
        "description": "Queried live web sources and local document store for relevant information.",
    },
    "fact_checker": {
        "title": "Verifying claims",
        "role": "FACT-CHECKER",
        "tag": "Verified",
        "tagType": "success",
        "description": "Cross-checked research notes and filtered out weak or unsupported claims.",
    },
    "summarizer": {
        "title": "Summarizing findings",
        "role": "SUMMARIZER",
        "tag": "Condensed",
        "tagType": "success",
        "description": "Organized verified facts into a clear, structured set of key points.",
    },
    "writer": {
        "title": "Writing final report",
        "role": "WRITER",
        "tag": "Drafted",
        "tagType": "success",
        "description": "Composed the final structured report from the summary.",
    },
}


def sse(obj: dict) -> str:
    return json.dumps(obj) + "\n"


async def orchestrate_stream(query: str):
    plan = [
        "Search the web and local documents for relevant information",
        "Verify claims and discard weak or unsupported ones",
        "Summarize verified findings into key points",
        "Write the final structured report",
    ]
    yield sse({"type": "plan", "data": plan})

    initial_state = {
        "query": query,
        "research_notes": [],
        "verified_facts": [],
        "summary": "",
        "final_report": "",
    }

    final_state = initial_state
    for update in graph.stream(initial_state, stream_mode="updates"):
        for node_name, node_output in update.items():
            info = NODE_DISPLAY.get(node_name)
            if info:
                yield sse({
                    "type": "step",
                    "data": {
                        "status": "success",
                        "title": info["title"],
                        "role": info["role"],
                        "tag": info["tag"],
                        "tagType": info["tagType"],
                        "description": info["description"],
                    },
                })
            final_state = node_output

    yield sse({"type": "report", "data": final_state.get("final_report", "")})
    yield sse({"type": "done"})


@router.post("/api/orchestrate")
async def orchestrate(payload: dict):
    query = payload.get("query", "")
    return StreamingResponse(orchestrate_stream(query), media_type="application/x-ndjson")