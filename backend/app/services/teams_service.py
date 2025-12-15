# backend/app/services/teams_service.py
from typing import List, Tuple
from fastapi import HTTPException

from app.utils.loaders import (
    load_teams_df,
    load_teams_matches_df,
    load_team_champion_performance_df,  # MỚI
)
from app.schemas.teams import (
    TeamSummary,
    TeamObjectiveStats,
    TeamDetail,
    TeamMatchRow,
    TeamChampionPerformance,           # MỚI
)
from app.schemas.common import Pagination


def paginate(df, page: int, size: int) -> Tuple[list, Pagination]:
    total = len(df)
    start = (page - 1) * size
    end = start + size
    sliced = df.iloc[start:end]
    pagination = Pagination(page=page, size=size, total=total)
    return sliced.to_dict(orient="records"), pagination


def get_team_detail(name: str) -> TeamDetail:
    df = load_teams_df()

    sub = df[df["teamname"].str.lower() == name.lower()]
    if sub.empty:
        raise HTTPException(status_code=404, detail="Team not found")

    row = sub.iloc[0]

    games = int(row["games"])
    wins = int(row["wins"])
    losses = int(row["losses"])
    winrate = float(row["winrate"])
    avg_gamelength = float(row["gamelength"])

    return TeamDetail(
        teamname=row["teamname"],
        games=games,
        wins=wins,
        losses=losses,
        winrate=winrate,
        avg_gamelength=avg_gamelength,
    )


def get_team_objectives(name: str) -> TeamObjectiveStats:
    df = load_teams_df()

    sub = df[df["teamname"].str.lower() == name.lower()]
    if sub.empty:
        raise HTTPException(status_code=404, detail="Team not found")

    def col_mean(col: str) -> float:
        if col in sub.columns:
            return float(sub[col].mean())
        return 0.0

    return TeamObjectiveStats(
        teamname=name,
        dragons=col_mean("dragons"),
        opp_dragons=col_mean("opp_dragons"),
        barons=col_mean("barons"),
        heralds=col_mean("heralds"),
        towers=col_mean("towers"),
        inhibitors=col_mean("inhibitors"),
        turretplates=col_mean("turretplates"),
    )


def get_team_matches(name: str, page: int, size: int):
    df = load_teams_matches_df()

    sub = df[df["teamname"].str.lower() == name.lower()].copy()
    if sub.empty:
        raise HTTPException(status_code=404, detail="Team not found")

    sub = sub.sort_values("year", ascending=False)

    cols = [
        "gameid",
        "year",
        "league",
        "side",
        "opponent",
        "result",
        "dragons",
        "barons",
        "heralds",
        "towers",
        "inhibitors",
    ]
    existing_cols = [c for c in cols if c in sub.columns]

    sub = sub[existing_cols]

    rows, pagination = paginate(sub, page, size)

    return [TeamMatchRow(**r) for r in rows], pagination


# MỚI: champion performance cho scatter plot
def get_team_champions(name: str) -> List[TeamChampionPerformance]:
    df = load_team_champion_performance_df()

    sub = df[df["teamname"].str.lower() == name.lower()].copy()
    if sub.empty:
        raise HTTPException(status_code=404, detail="Team not found")

    sub = sub.sort_values("games", ascending=False)

    return [
        TeamChampionPerformance(
            champion=row["champion"],
            games=int(row["games"]),
            wins=int(row["wins"]),
            winrate=float(row["winrate"]),
        )
        for _, row in sub.iterrows()
    ]
