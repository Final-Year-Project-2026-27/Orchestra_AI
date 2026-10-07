import google.generativeai as genai
from app.core.config import settings
from app.agents.state import AgentState
from app.agents.tools import web_search
from app.retrieval.vectorstore import retrieve
from app.security.sanitizer import sanitize_content, wrap_as_untrusted

genai.configure(api_key=settings.gemini_api_key)
model = genai.GenerativeModel("gemini-3.6-flash")

def researcher_node(state: AgentState) -> AgentState:
    query = state["query"]

    web_results = web_search(query)
    web_notes = []
    for r in web_results:
        cleaned_text, removed = sanitize_content(r["content"])
        if removed > 0:
            print(f"[GUARDRAIL] Removed {removed} suspicious sentence(s) from {r['url']}")
        web_notes.append(wrap_as_untrusted(cleaned_text, r["url"]))

    local_results = retrieve(query, top_k=3)
    local_notes = []
    for r in local_results:
        cleaned_text, removed = sanitize_content(r["text"])
        if removed > 0:
            print(f"[GUARDRAIL] Removed {removed} suspicious sentence(s) from {r['source']}")
        local_notes.append(wrap_as_untrusted(cleaned_text, r["source"]))

    all_notes = web_notes + local_notes
    return {**state, "research_notes": all_notes}