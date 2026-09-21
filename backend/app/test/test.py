from app.ingestion.loader import load_documents
from app.ingestion.chunker import chunk_text
from app.retrieval.vectorstore import add_chunks, retrieve

for path, text in load_documents("data/raw_docs"):
    chunks = chunk_text(text)
    add_chunks(chunks, source_name=path.name)

results = retrieve("what is this document about?", top_k=3)
for r in results:
    print(f"\n[{r['source']}] (distance: {r['distance']:.3f})")
    print(r["text"][:200])