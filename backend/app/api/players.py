# placeholder
# backend/app/api/players.py
from fastapi import APIRouter, Query
from typing import List
from app.schemas.players import PlayerSummary, PlayerDetail, PlayerChampionStat, PlayerRule
from app.schemas.common import PaginatedResponse
from app.services import players_service

router = APIRouter(prefix="/players", tags=["players"])

@router.get("/search", response_model=PaginatedResponse[PlayerSummary])
def search_players(
    name: str = Query(..., min_length=2),
    page: int = Query(1, ge=1),
    size: int = Query(10, ge=1, le=100),
):
    items, pagination = players_service.search_players(name, page, size)
    return {"items": items, "pagination": pagination}

@router.get("/{name}", response_model=PlayerDetail)
def get_player(name: str):
    return players_service.get_player_detail(name)

@router.get("/{name}/champions", response_model=List[PlayerChampionStat])
def get_player_champions(name: str):
    return players_service.get_player_champions(name)

@router.get("/{name}/rules", response_model=List[PlayerRule])
def get_player_rules(name: str):
    return players_service.get_player_rules(name)
