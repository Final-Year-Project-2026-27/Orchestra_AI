from app.agents.graph import build_graph

graph = build_graph()

result = graph.invoke({
    "query": "What are the benefits of multi-agent AI systems over single LLM agents?",
    "research_notes": [],
    "verified_facts": [],
    "summary": "",
    "final_report": ""
})

print("\n=== FINAL REPORT ===\n")
print(result["final_report"])
