from typing import TypedDict

class AgentState(TypedDict):
    query: str                  # the user's original question
    research_notes: list[str]   # raw findings from Researcher
    verified_facts: list[str]   # facts that passed Fact-Checker
    summary: str                 # condensed output from Summarizer
    final_report: str            # the finished output from Writer