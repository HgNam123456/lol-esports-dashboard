# backend/app/services/champions_service.py
from typing import List

from app.utils.loaders import (
    load_champions_df,
    load_mid_jng_pairs_df,
    load_bot_sup_pairs_df,
    load_pair_rules_df,
)
from app.schemas.champions import (
    ChampionPairStat,
    ChampionFirstBloodStat,
    ChampionGoldDiff15Stat,
    ChampionAssociationsResponse,
    MidJngPairStat,
    BotSupPairStat,
)


def get_synergy_pairs() -> List[ChampionPairStat]:
    df = load_pair_rules_df()

    # đã sort theo support trong notebook, nhưng sort lại cho chắc
    df = df.sort_values(
        by=["support", "confidence", "lift"],
        ascending=[False, False, False],
    ).head(50)

    return [
        ChampionPairStat(
            pair_type=row["pair_type"],
            role1=row["role1"],
            champ1=row["champ1"],
            role2=row["role2"],
            champ2=row["champ2"],
            support=float(row["support"]),
            confidence=float(row["confidence"]),
            lift=float(row["lift"]),
        )
        for _, row in df.iterrows()
    ]


def get_mid_jng_top() -> List[MidJngPairStat]:
    df = load_mid_jng_pairs_df()
    df = df.sort_values(
        by=["winrate", "games"],
        ascending=[False, False],
    ).head(20)

    return [
        MidJngPairStat(
            mid_champ=row["mid_champ"],
            jng_champ=row["jng_champ"],
            games=int(row["games"]),
            wins=int(row["wins"]),
            winrate=float(row["winrate"]),
        )
        for _, row in df.iterrows()
    ]


def get_bot_sup_top() -> List[BotSupPairStat]:
    df = load_bot_sup_pairs_df()
    df = df.sort_values(
        by=["winrate", "games"],
        ascending=[False, False],
    ).head(20)

    return [
        BotSupPairStat(
            bot_champ=row["bot_champ"],
            sup_champ=row["sup_champ"],
            games=int(row["games"]),
            wins=int(row["wins"]),
            winrate=float(row["winrate"]),
        )
        for _, row in df.iterrows()
    ]


def get_first_blood_top() -> List[ChampionFirstBloodStat]:
    champs_df = load_champions_df()
    df = champs_df[["champion", "games", "firstblood"]].copy()
    df["first_blood_rate"] = df["firstblood"] / df["games"]
    df = df.sort_values("first_blood_rate", ascending=False).head(20)

    return [
        ChampionFirstBloodStat(
            champion=row["champion"],
            games=int(row["games"]),
            first_blood_rate=float(row["first_blood_rate"]),
        )
        for _, row in df.iterrows()
    ]


def get_gold_diff_15_top() -> List[ChampionGoldDiff15Stat]:
    champs_df = load_champions_df()
    df = champs_df[["champion", "golddiffat15"]].copy()
    df = df.sort_values("golddiffat15", ascending=False).head(20)

    return [
        ChampionGoldDiff15Stat(
            champion=row["champion"],
            avg_gold_diff_15=float(row["golddiffat15"]),
        )
        for _, row in df.iterrows()
    ]


def get_champion_associations() -> ChampionAssociationsResponse:
    return ChampionAssociationsResponse(
        synergy_pairs=get_synergy_pairs(),
        mid_jng_top=get_mid_jng_top(),
        bot_sup_top=get_bot_sup_top(),
        first_blood_top=get_first_blood_top(),
        gold_diff_15_top=get_gold_diff_15_top(),
    )
