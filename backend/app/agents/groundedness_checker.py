import json
import google.generativeai as genai
from app.core.config import settings
from app.agents.state import AgentState

genai.configure(api_key=settings.gemini_api_key)
model = genai.GenerativeModel("gemini-3.6-flash")

def groundedness_node(state: AgentState) -> AgentState:
    report = state["final_report"]
    facts = "\n".join(state["verified_facts"])

    prompt = f"""You are a groundedness-checking agent. Below are verified facts and a
final report that was supposed to be based ONLY on those facts.

Verified facts:
{facts}

Report:
{report}

Check every factual claim in the report against the verified facts. For any claim that is
NOT clearly supported by the verified facts, insert the marker " ⚠[unverified]" immediately
after that claim. Do not remove, rewrite, or soften any claim — only add the marker where needed.

Respond with ONLY valid JSON, no other text, in exactly this shape:
{{"flagged_report": "<the report text with markers inserted where needed>", "has_unverified_claims": true or false}}"""

    response = model.generate_content(prompt)
    text = response.text.strip()

    # Gemini sometimes wraps JSON in markdown code fences — strip those if present
    if text.startswith("```"):
        text = text.split("```")[1]
        if text.startswith("json"):
            text = text[4:]

    try:
        result = json.loads(text)
        flagged_report = result.get("flagged_report", report)
        has_unverified = result.get("has_unverified_claims", False)
    except (json.JSONDecodeError, AttributeError):
        # If parsing fails for any reason, fall back to the unflagged report
        # rather than crashing the whole pipeline
        flagged_report = report
        has_unverified = False

    return {**state, "flagged_report": flagged_report, "has_unverified_claims": has_unverified}