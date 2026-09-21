import google.generativeai as genai
from app.core.config import settings
from app.agents.state import AgentState

genai.configure(api_key=settings.gemini_api_key)
model = genai.GenerativeModel("gemini-3.6-flash")

def fact_checker_node(state: AgentState) -> AgentState:
    notes = "\n".join(state["research_notes"])

    prompt = f"""You are a fact-checking agent. Below are research notes gathered
from web and document sources. Identify which claims are well-supported by
the sources and which are vague, unsupported, or contradictory.

Research notes:
{notes}

Return ONLY the claims that are well-supported, one per line, rewritten
clearly and concisely. Discard weak or unverifiable claims entirely."""

    response = model.generate_content(prompt)
    verified = [line.strip() for line in response.text.split("\n") if line.strip()]

    return {**state, "verified_facts": verified}