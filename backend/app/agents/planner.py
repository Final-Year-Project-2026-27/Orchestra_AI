import google.generativeai as genai
from app.core.config import settings
from app.agents.state import AgentState

genai.configure(api_key=settings.gemini_api_key)
model = genai.GenerativeModel("gemini-3.6-flash")

def planner_node(state: AgentState) -> AgentState:
    query = state["query"]

    prompt = f"""You are a research planning agent. Given this question, write a short
numbered plan (4-5 steps max) describing how you will research and answer it.

Question: "{query}"

Return ONLY the plan steps, one per line, no extra commentary."""

    response = model.generate_content(prompt)
    plan = [line.strip() for line in response.text.split("\n") if line.strip()]

    return {**state, "plan": plan}