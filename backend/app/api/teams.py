# backend/app/api/teams.py
from fastapi import APIRouter, Query
from typing import List

from app.schemas.teams import (
    TeamDetail,
    TeamObjectiveStats,
    TeamMatchRow,
    TeamChampionPerformance,  # MỚI
)
from app.schemas.common import PaginatedResponse
from app.services import teams_service

router = APIRouter(tags=["teams"])


@router.get("/{name}", response_model=TeamDetail)
def get_team(name: str):
    """
    Thống kê tổng quan cho một team.
    """
    return teams_service.get_team_detail(name)


@router.get("/{name}/objectives", response_model=TeamObjectiveStats)
def get_team_objectives(name: str):
    """
    Các chỉ số objective: dragons, barons, heralds, towers, inhibitors, turretplates, ...
    """
    return teams_service.get_team_objectives(name)


@router.get("/{name}/matches", response_model=PaginatedResponse[TeamMatchRow])
def get_team_matches(
    name: str,
    page: int = Query(1, ge=1),
    size: int = Query(20, ge=1, le=100),
):
    """
    Danh sách các trận đấu của team, dùng cho table chi tiết + stacked chart objectives.
    """
    items, pagination = teams_service.get_team_matches(name, page, size)
    return {"items": items, "pagination": pagination}


# MỚI: champion performance cho scatter plot
@router.get(
    "/{name}/champions",
    response_model=List[TeamChampionPerformance],
)
def get_team_champions(name: str):
    """
    Thống kê theo champion: số trận pick, số trận thắng, winrate.
    Dùng cho scatter plot (games vs winrate).
    """
    return teams_service.get_team_champions(name)
