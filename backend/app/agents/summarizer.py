import google.generativeai as genai
from app.core.config import settings
from app.agents.state import AgentState

genai.configure(api_key=settings.gemini_api_key)
model = genai.GenerativeModel("gemini-3.6-flash")

def summarizer_node(state: AgentState) -> AgentState:
    facts = "\n".join(state["verified_facts"])

    prompt = f"""Summarize the following verified facts into a clear,
well-organized set of key points relevant to this question: "{state['query']}"

Facts:
{facts}

Write a concise summary (not a full report yet, just organized key points)."""

    response = model.generate_content(prompt)
    return {**state, "summary": response.text}