# backend/app/schemas/teams.py
from pydantic import BaseModel
from typing import List


class TeamSummary(BaseModel):
    teamname: str
    games: int
    wins: int
    losses: int
    winrate: float


class TeamObjectiveStats(BaseModel):
    teamname: str
    dragons: float
    opp_dragons: float
    barons: float
    heralds: float
    towers: float
    inhibitors: float
    turretplates: float


class TeamDetail(BaseModel):
    teamname: str
    games: int
    wins: int
    losses: int
    winrate: float
    avg_gamelength: float
    # có thể mở rộng thêm các chỉ số khác


class TeamMatchRow(BaseModel):
    gameid: str
    year: int
    league: str
    side: str
    opponent: str | None = None
    result: int
    dragons: int
    barons: int
    heralds: int
    towers: int
    inhibitors: int


# MỚI: champion performance cho scatter plot
class TeamChampionPerformance(BaseModel):
    champion: str
    games: int
    wins: int
    winrate: float
