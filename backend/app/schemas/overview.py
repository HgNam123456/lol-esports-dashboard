# backend/app/schemas/overview.py
from pydantic import BaseModel


class OverviewStats(BaseModel):
    total_matches: int
    total_players: int
    total_teams: int
    total_champions: int
    blue_side_winrate: float
    red_side_winrate: float


# MỚI: dùng cho bảng champion pick & winrate ở OverviewPage
class OverviewChampionStat(BaseModel):
    champion: str
    games: int
    wins: int
    winrate: float
