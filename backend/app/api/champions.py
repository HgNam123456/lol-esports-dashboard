# backend/app/api/champions.py
from fastapi import APIRouter
from app.schemas.champions import ChampionAssociationsResponse
from app.services import champions_service


router = APIRouter(prefix="/champions", tags=["champions"])


@router.get("/associations", response_model=ChampionAssociationsResponse)
def get_champion_associations():
    """
    Trả về dữ liệu cho Champion Stats screen:
    - Luật kết hợp cho các cặp tướng (synergy_pairs: MID–JNG, BOT–SUP)
    - Top cặp MID–JNG theo winrate (mid_jng_top)
    - Top cặp BOT–SUP theo winrate (bot_sup_top)
    - Tướng có first blood rate cao nhất (first_blood_top)
    - Tướng có gold diff @15 cao nhất (gold_diff_15_top)
    """
    return champions_service.get_champion_associations()
