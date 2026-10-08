from langgraph.graph import StateGraph, END
from langgraph.checkpoint.memory import MemorySaver
from app.agents.state import AgentState
from app.agents.planner import planner_node
from app.agents.researcher import researcher_node
from app.agents.fact_checker import fact_checker_node
from app.agents.contradiction_checker import contradiction_node
from app.agents.summarizer import summarizer_node
from app.agents.writer import writer_node
from app.agents.groundedness_checker import groundedness_node

def build_graph():
    graph = StateGraph(AgentState)

    graph.add_node("planner", planner_node)
    graph.add_node("researcher", researcher_node)
    graph.add_node("fact_checker", fact_checker_node)
    graph.add_node("contradiction_checker", contradiction_node)
    graph.add_node("summarizer", summarizer_node)
    graph.add_node("writer", writer_node)
    graph.add_node("groundedness_checker", groundedness_node)

    graph.set_entry_point("planner")
    graph.add_edge("planner", "researcher")
    graph.add_edge("researcher", "fact_checker")
    graph.add_edge("fact_checker", "contradiction_checker")
    graph.add_edge("contradiction_checker", "summarizer")
    graph.add_edge("summarizer", "writer")
    graph.add_edge("writer", "groundedness_checker")
    graph.add_edge("groundedness_checker", END)

    checkpointer = MemorySaver()
    return graph.compile(checkpointer=checkpointer, interrupt_before=["researcher"])