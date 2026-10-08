from app.agents.contradiction_checker import contradiction_node

state = {
    "query": "test",
    "plan": [],
    "research_notes": [],
    "verified_facts": [
        "Multi-agent workflows reduce software development time by 30 to 70 percent.",
        "LangGraph models agent workflows as a state graph.",
        "Multi-agent workflows have no measurable effect on software development time.",
        "ChromaDB is an open-source vector database.",
    ],
    "contradictions": [],
    "summary": "",
    "final_report": "",
}

result = node = contradiction_node(state)

print("=== CONTRADICTIONS FOUND ===")
for c in result["contradictions"]:
    print("-", c)

print("\n=== FACTS REMAINING ===")
for f in result["verified_facts"]:
    print("-", f)