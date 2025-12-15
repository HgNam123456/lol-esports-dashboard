# placeholder
# backend/app/services/players_service.py
from typing import List, Tuple
from fastapi import HTTPException
from app.utils.loaders import load_players_df, load_player_rules_df, load_player_matches_champion_df
from app.schemas.players import PlayerSummary, PlayerDetail, PlayerChampionStat, PlayerRule
from app.schemas.common import Pagination

def paginate(df, page: int, size: int) -> Tuple[list, Pagination]:
    total = len(df)
    start = (page - 1) * size
    end = start + size
    sliced = df.iloc[start:end]
    pagination = Pagination(page=page, size=size, total=total)
    return sliced.to_dict(orient="records"), pagination

def search_players(name: str, page: int, size: int):
    df = load_players_df()
    print("DEBUG players_df columns:", df.columns)

    mask = df["playername"].str.contains(name, case=False, na=False)
    sub = df[mask].copy()

    # nếu đã có sẵn games, wins, winrate trong df
    # chọn các cột đúng với PlayerSummary schema
    cols = ["playername", "teamname", "games", "wins", "winrate"]
    existing_cols = [c for c in cols if c in sub.columns]
    sub = sub[existing_cols]

    rows, pagination = paginate(sub.sort_values("games", ascending=False), page, size)
    items = [PlayerSummary(**r) for r in rows]
    return items, pagination


def get_player_detail(name: str) -> PlayerDetail:
    df = load_players_df()

    # DEBUG nếu cần
    # print("DEBUG players_df columns:", df.columns)

    sub = df[df["playername"] == name]

    if sub.empty:
        raise HTTPException(status_code=404, detail="Player not found")

    row = sub.iloc[0]

    # nếu trong df đã có games, wins, losses, kda,...
    games = int(row.get("games", 0))
    wins = int(row.get("wins", 0))
    losses = int(row.get("losses", games - wins))
    kda = float(row.get("kda", 0.0))

    return PlayerDetail(
        playername=row["playername"],
        teamname=row.get("teamname", ""),
        games=games,
        wins=wins,
        losses=losses,
        kda=kda,
        dpm=float(row.get("dpm", 0.0)),
        damageshare=float(row.get("damageshare", 0.0)),
        visionscore=float(row.get("visionscore", 0.0)),
        earnedgold=float(row.get("earnedgold", 0.0)),
        earnedgpm=float(row.get("earnedgpm", 0.0)),
    )


def get_player_champions(name: str) -> list[PlayerChampionStat]:
    df = load_player_matches_champion_df()

    sub = df[df["playername"] == name].copy()
    if sub.empty:
        return []

    # Sắp xếp theo số trận sử dụng (games) giảm dần,
    # nếu bằng nhau thì ưu tiên winrate cao hơn
    sub = sub.sort_values(
        by=["games", "winrate"],
        ascending=[False, False],
    )

    return [
        PlayerChampionStat(
            champion=row["champion"],
            games=int(row["games"]),
            wins=int(row["wins"]),
            winrate=float(row["winrate"]),
        )
        for _, row in sub.iterrows()
    ]


def get_player_rules(name: str) -> List[PlayerRule]:
    rules_df = load_player_rules_df()
    # Không lọc theo player nữa vì không có cột playername
    sub = rules_df.copy()
    sub = sub.sort_values("lift", ascending=False).head(10)

    result = []
    for idx, row in sub.iterrows():
        result.append(
            PlayerRule(
                rule_id=int(idx),
                antecedent=str(row["antecedent"]),
                consequent=str(row["consequent"]),
                support=float(row["support"]),
                confidence=float(row["confidence"]),
                lift=float(row["lift"]),
            )
        )
    return result


