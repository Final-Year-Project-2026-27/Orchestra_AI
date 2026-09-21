import google.generativeai as genai
from app.core.config import settings

genai.configure(api_key=settings.gemini_api_key)

def get_embedding(text: str) -> list[float]:
    """Converts a document chunk into a vector embedding."""
    result = genai.embed_content(
        model="models/gemini-embedding-001",
        content=text,
        task_type="retrieval_document"
    )
    return result["embedding"]

def get_query_embedding(text: str) -> list[float]:
    """Converts a user's question into a vector — different task_type improves relevance."""
    result = genai.embed_content(
        model="models/gemini-embedding-001",
        content=text,
        task_type="retrieval_query"
    )
    return result["embedding"]