from tavily import TavilyClient
from app.core.config import settings

tavily_client = TavilyClient(api_key=settings.tavily_api_key)

def web_search(query: str, max_results: int = 3) -> list[dict]:
    """Searches the web via Tavily and returns title + content snippets."""
    response = tavily_client.search(query=query, max_results=max_results)
    return [
        {"title": r["title"], "content": r["content"], "url": r["url"]}
        for r in response["results"]
    ]