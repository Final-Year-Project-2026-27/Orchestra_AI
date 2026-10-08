from typing import TypedDict

class AgentState(TypedDict):
    query: str
    plan: list[str]
    research_notes: list[str]
    verified_facts: list[str]
    contradictions: list[str]       
    summary: str
    final_report: str
    flagged_report: str
    has_unverified_claims: bool