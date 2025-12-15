# backend/app/schemas/champions.py
from typing import List
from pydantic import BaseModel


class ChampionPairStat(BaseModel):
    pair_type: str       # "MID_JNG" hoặc "BOT_SUP"
    role1: str           # "MID" / "BOT"
    champ1: str
    role2: str           # "JNG" / "SUP"
    champ2: str
    support: float
    confidence: float
    lift: float


class MidJngPairStat(BaseModel):
    mid_champ: str
    jng_champ: str
    games: int
    wins: int
    winrate: float


class BotSupPairStat(BaseModel):
    bot_champ: str
    sup_champ: str
    games: int
    wins: int
    winrate: float


class ChampionFirstBloodStat(BaseModel):
    champion: str
    games: int
    first_blood_rate: float


class ChampionGoldDiff15Stat(BaseModel):
    champion: str
    avg_gold_diff_15: float


class ChampionAssociationsResponse(BaseModel):
    synergy_pairs: List[ChampionPairStat]
    mid_jng_top: List[MidJngPairStat]
    bot_sup_top: List[BotSupPairStat]
    first_blood_top: List[ChampionFirstBloodStat]
    gold_diff_15_top: List[ChampionGoldDiff15Stat]
