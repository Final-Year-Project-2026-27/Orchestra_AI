from app.ingestion.loader import load_document
from app.ingestion.chunker import chunk_text
from app.retrieval.vectorstore import add_chunks, retrieve

<<<<<<< HEAD
text = load_document("data/raw_docs/sample.pdf")
=======
text = load_document("data/rawdocs/sample.pdf")
>>>>>>> 7cb3f6ac72e1a984f0973909c375e336ce56f0bb
chunks = chunk_text(text)
add_chunks(chunks, source_name="sample.pdf")

results = retrieve("what is this document about?", top_k=3)
for r in results:
    print(f"\n[{r['source']}] (distance: {r['distance']:.3f})")
    print(r["text"][:200])