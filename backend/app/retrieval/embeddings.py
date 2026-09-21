import os
from dotenv import load_dotenv
from google import genai

load_dotenv()

<<<<<<< HEAD
def get_embedding(text: str) -> list[float]:
    """Converts a document chunk into a vector embedding."""
    result = genai.embed_content(
        model="models/gemini-embedding-001",
        content=text,
        task_type="retrieval_document"
=======
api_key = os.getenv("GEMINI_API_KEY")

if not api_key:
    raise ValueError(
        "GEMINI_API_KEY not found. Check your backend/.env file."
>>>>>>> 7cb3f6ac72e1a984f0973909c375e336ce56f0bb
    )

<<<<<<< HEAD
def get_query_embedding(text: str) -> list[float]:
    """Converts a user's question into a vector — different task_type improves relevance."""
    result = genai.embed_content(
        model="models/gemini-embedding-001",
        content=text,
        task_type="retrieval_query"
=======
client = genai.Client(api_key=api_key)

import os
from google import genai

client = genai.Client(api_key=os.getenv("GEMINI_API_KEY"))


def get_query_embedding(text):
    result = client.models.embed_content(
        model="gemini-embedding-001",
        contents=text
>>>>>>> 7cb3f6ac72e1a984f0973909c375e336ce56f0bb
    )

    return result.embeddings[0].values


def get_document_embedding(text):
    result = client.models.embed_content(
        model="gemini-embedding-001",
        contents=text
    )

    return result.embeddings[0].values

def get_embedding(text):
    return get_document_embedding(text)