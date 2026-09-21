import chromadb
from app.retrieval.embeddings import get_embedding, get_query_embedding

client = chromadb.PersistentClient(path="app/data/processed/chroma_db")
collection = client.get_or_create_collection(name="research_docs")

def add_chunks(chunks: list[str], source_name: str):
    """Embeds and stores chunks in ChromaDB with metadata."""
    collection.delete(where={"source": source_name})
    ids = [f"{source_name}_{i}" for i in range(len(chunks))]
    embeddings = [get_embedding(chunk) for chunk in chunks]
    metadatas = [{"source": source_name, "chunk_index": i} for i in range(len(chunks))]

    collection.add(ids=ids, embeddings=embeddings, documents=chunks, metadatas=metadatas)
    print(f"Added {len(chunks)} chunks from {source_name}")

def retrieve(query: str, top_k: int = 5) -> list[dict]:
    """Returns top-k most relevant chunks for a query."""
    query_emb = get_query_embedding(query)
    results = collection.query(query_embeddings=[query_emb], n_results=top_k)
    return [
        {"text": doc, "source": meta["source"], "distance": dist}
        for doc, meta, dist in zip(
            results["documents"][0], results["metadatas"][0], results["distances"][0]
        )
    ]