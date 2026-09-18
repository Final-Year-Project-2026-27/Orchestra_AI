# ResearchCrew — Multi-Agent Autonomous Research Assistant

> A final-year B.Tech project: an AI agent system where specialized agents
> collaborate to research a topic, verify facts across sources, self-correct
> when confidence is low, and produce a transparent, cited report — instead
> of a single black-box LLM response.

## Key Features
- Multi-agent pipeline (Researcher, Fact-Checker, Summarizer, Writer) 
  orchestrated with LangGraph
- Plan-first workflow — shows the research plan for approval before execution
- Adaptive retry — switches search strategy when confidence is low
- Contradiction checker — flags inconsistencies between agent outputs
- Groundedness checker — flags any claim in the final report that isn't 
  traceable to a real source
- Guardrail layer — sanitizes scraped web content against prompt injection
- Live agent trace — see every step as it happens, not just the final answer

## Tech Stack
- **Frontend**: Next.js (TypeScript, Tailwind CSS, App Router)
- **Backend**: FastAPI (Python)
- **LLM**: Gemini API
- **Orchestration**: LangGraph
- **Vector Store**: ChromaDB
- **Web Search**: Tavily API
- **Containerization**: Docker + Docker Compose

## Project Structure
\```
research-crew/
├── backend/
│   └── app/
│       ├── agents/        # Researcher, Fact-Checker, Summarizer, Writer, Planning
│       ├── ingestion/      # Document loading + chunking
│       ├── retrieval/      # Embeddings + ChromaDB
│       ├── security/       # Guardrail, prompt-injection defense, groundedness check
│       ├── api/            # FastAPI routes
│       └── core/           # Config/settings
├── frontend/               # Next.js app
├── docker/                 # Dockerfiles
└── docker-compose.yml
\```

## Setup (Windows)

### Prerequisites
- Python 3.11+ (installed and added to PATH)
- Node.js 20+
- Docker Desktop (optional, for containerized run)

### Backend
\```
cd backend
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
uvicorn app.main:app --reload --port 8000
\```

### Frontend
\```
cd frontend
npm install
npm run dev
\```

### Environment Variables
Create `backend\.env`:
\```
GEMINI_API_KEY=your_key_here
TAVILY_API_KEY=your_key_here
\```

### Docker (run both together)
\```
docker compose up --build
\```

