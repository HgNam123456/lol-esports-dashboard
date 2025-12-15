# backend/app/core/config.py
from pydantic import BaseModel
from functools import lru_cache
from pathlib import Path

class Settings(BaseModel):
    DATA_DIR: Path = Path(__file__).resolve().parents[2] / "data" / "processed"
    CACHE_TTL_SECONDS: int = 300

@lru_cache
def get_settings() -> Settings:
    return Settings()
