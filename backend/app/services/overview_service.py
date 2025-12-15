# backend/app/services/overview_service.py
from app.utils.loaders import (
    load_players_df,
    load_teams_df,
    load_champions_df,
    load_teams_matches_df,
    load_overview_champion_stats_df,   # MỚI
)
from app.schemas.overview import (
    OverviewStats,
    OverviewChampionStat,              # MỚI
)


def get_overview_stats() -> OverviewStats:
    players_df = load_players_df()
    teams_df = load_teams_df()              # bảng aggregate theo team
    matches_df = load_teams_matches_df()    # bảng game-level
    champs_df = load_champions_df()

    # tổng số trận: đếm gameid trên bảng trận
    total_matches = matches_df["gameid"].nunique()

    total_players = players_df["playername"].nunique()
    total_teams = teams_df["teamname"].nunique()
    total_champions = champs_df["champion"].nunique()

    # winrate theo side dùng bảng trận
    blue = matches_df[matches_df["side"].str.lower() == "blue"]
    red = matches_df[matches_df["side"].str.lower() == "red"]
    blue_wr = float((blue["result"] == 1).mean()) if not blue.empty else 0.0
    red_wr = float((red["result"] == 1).mean()) if not red.empty else 0.0

    return OverviewStats(
        total_matches=int(total_matches),
        total_players=int(total_players),
        total_teams=int(total_teams),
        total_champions=int(total_champions),
        blue_side_winrate=blue_wr,
        red_side_winrate=red_wr,
    )


# MỚI: champion pick & winrate cho OverviewPage
def get_overview_champions(limit: int | None = None) -> list[OverviewChampionStat]:
    df = load_overview_champion_stats_df().copy()

    # sort theo games desc rồi winrate desc
    df = df.sort_values(["games", "winrate"], ascending=[False, False])

    if limit:
        df = df.head(limit)

    return [
        OverviewChampionStat(
            champion=row["champion"],
            games=int(row["games"]),
            wins=int(row["wins"]),
            winrate=float(row["winrate"]),
        )
        for _, row in df.iterrows()
    ]
