import google.generativeai as genai
from app.core.config import settings
from app.agents.state import AgentState

genai.configure(api_key=settings.gemini_api_key)
model = genai.GenerativeModel("gemini-3.6-flash")

def writer_node(state: AgentState) -> AgentState:
    prompt = f"""Write a well-structured, professional report answering this
question: "{state['query']}"

Use the following summary as your source material — do not add information
that isn't supported by it:

{state['summary']}

Format with a short introduction, clear sections, and a conclusion."""

    response = model.generate_content(prompt)
    return {**state, "final_report": response.text}