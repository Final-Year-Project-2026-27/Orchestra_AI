import google.generativeai as genai
from app.core.config import settings
from app.agents.state import AgentState
from app.agents.tools import web_search
from app.retrieval.vectorstore import retrieve

genai.configure(api_key=settings.gemini_api_key)
model = genai.GenerativeModel("gemini-3.6-flash")

def researcher_node(state: AgentState) -> AgentState:
    query = state["query"]

    # Search the web
    web_results = web_search(query)
    web_notes = [f"[Web: {r['url']}] {r['content']}" for r in web_results]

    # Search your local ChromaDB documents
    local_results = retrieve(query, top_k=3)
    local_notes = [f"[Local: {r['source']}] {r['text']}" for r in local_results]

    all_notes = web_notes + local_notes
    return {**state, "research_notes": all_notes}