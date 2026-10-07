from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.orchestrate import router as orchestrate_router

app = FastAPI(title="ResearchCrew API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(orchestrate_router)

@app.get("/health")
def health_check():
    return {"status": "ok"}