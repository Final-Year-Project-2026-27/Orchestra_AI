from langgraph.graph import StateGraph, END
from app.agents.state import AgentState
from app.agents.researcher import researcher_node
from app.agents.fact_checker import fact_checker_node
from app.agents.summarizer import summarizer_node
from app.agents.writer import writer_node

def build_graph():
    graph = StateGraph(AgentState)

    graph.add_node("researcher", researcher_node)
    graph.add_node("fact_checker", fact_checker_node)
    graph.add_node("summarizer", summarizer_node)
    graph.add_node("writer", writer_node)

    graph.set_entry_point("researcher")
    graph.add_edge("researcher", "fact_checker")
    graph.add_edge("fact_checker", "summarizer")
    graph.add_edge("summarizer", "writer")
    graph.add_edge("writer", END)

    return graph.compile()