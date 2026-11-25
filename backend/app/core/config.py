from pathlib import Path
from pydantic_settings import BaseSettings, SettingsConfigDict

# backend/app/core/config.py -> parents[2] is the "backend" folder, so the .env
# is found no matter which folder you start the server from.
BACKEND_DIR = Path(__file__).resolve().parents[2]


class Settings(BaseSettings):
    gemini_api_key: str
    tavily_api_key: str

    model_config = SettingsConfigDict(env_file=BACKEND_DIR / ".env", extra="ignore")


settings = Settings()