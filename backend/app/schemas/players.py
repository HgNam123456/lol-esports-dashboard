# placeholder
# backend/app/schemas/players.py
from pydantic import BaseModel
from typing import List

class PlayerSummary(BaseModel):
    playername: str
    teamname: str
    games: int
    winrate: float

class PlayerDetail(BaseModel):
    playername: str
    teamname: str
    games: int
    wins: int
    losses: int
    kda: float
    dpm: float
    damageshare: float
    visionscore: float
    earnedgold: float
    earnedgpm: float
    # ... các field còn lại bạn cần

class PlayerChampionStat(BaseModel):
    champion: str
    games: int
    wins: int
    winrate: float

class PlayerRule(BaseModel):
    rule_id: int
    antecedent: str
    consequent: str
    support: float
    confidence: float
    lift: float
