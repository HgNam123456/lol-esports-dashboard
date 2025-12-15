# backend/app/api/overview.py
from fastapi import APIRouter, Query
from typing import List

from app.schemas.overview import OverviewStats, OverviewChampionStat
from app.services import overview_service


router = APIRouter(prefix="/overview", tags=["overview"])


@router.get("", response_model=OverviewStats)
def get_overview():
    """
    Tổng quan: số trận, số player, team, champion, winrate blue/red.
    """
    return overview_service.get_overview_stats()


# MỚI: champion pick & winrate global
@router.get("/champions", response_model=List[OverviewChampionStat])
def get_overview_champions(limit: int = Query(50, ge=1, le=500)):
    """
    Thống kê theo champion: số trận được pick, số trận thắng, winrate.
    Sort theo games desc rồi winrate desc.
    Dùng cho bảng ranking ở OverviewPage.
    """
    return overview_service.get_overview_champions(limit=limit)
