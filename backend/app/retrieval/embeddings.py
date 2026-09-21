import os
from dotenv import load_dotenv
from google import genai

load_dotenv()

api_key = os.getenv("GEMINI_API_KEY")

if not api_key:
    raise ValueError(
        "GEMINI_API_KEY not found. Check your backend/.env file."
    )

client = genai.Client(api_key=api_key)

import os
from google import genai

client = genai.Client(api_key=os.getenv("GEMINI_API_KEY"))


def get_query_embedding(text):
    result = client.models.embed_content(
        model="gemini-embedding-001",
        contents=text
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