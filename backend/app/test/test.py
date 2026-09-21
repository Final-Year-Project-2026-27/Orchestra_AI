from app.ingestion.loader import load_document
from app.ingestion.chunker import chunk_text
from app.retrieval.vectorstore import add_chunks, retrieve

text = load_document("data/raw_docs/sample.pdf")
chunks = chunk_text(text)
add_chunks(chunks, source_name="sample.pdf")

results = retrieve("what is this document about?", top_k=3)
for r in results:
    print(f"\n[{r['source']}] (distance: {r['distance']:.3f})")
    print(r["text"][:200])