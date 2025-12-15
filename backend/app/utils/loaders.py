# backend/app/utils/loaders.py
from pathlib import Path
from functools import lru_cache
import pandas as pd
from app.core.config import get_settings

settings = get_settings()


@lru_cache
def load_players_df() -> pd.DataFrame:
    return pd.read_parquet(settings.DATA_DIR / "players.parquet")


@lru_cache
def load_teams_df() -> pd.DataFrame:
    return pd.read_parquet(settings.DATA_DIR / "teams.parquet")


@lru_cache
def load_teams_matches_df() -> pd.DataFrame:
    return pd.read_parquet(settings.DATA_DIR / "team_matches.parquet")


@lru_cache
def load_champions_df() -> pd.DataFrame:
    return pd.read_parquet(settings.DATA_DIR / "champions.parquet")


@lru_cache
def load_player_rules_df() -> pd.DataFrame:
    return pd.read_parquet(settings.DATA_DIR / "player_rules.parquet")


@lru_cache
def load_champion_rules_df() -> pd.DataFrame:
    return pd.read_parquet(settings.DATA_DIR / "champion_rules.parquet")


@lru_cache
def load_player_matches_champion_df() -> pd.DataFrame:
    return pd.read_parquet(settings.DATA_DIR / "player_matches_champion.parquet")


# === mới thêm cho sync pairs & association rules ===

@lru_cache
def load_mid_jng_pairs_df() -> pd.DataFrame:
    return pd.read_parquet(settings.DATA_DIR / "mid_jng_pairs.parquet")


@lru_cache
def load_bot_sup_pairs_df() -> pd.DataFrame:
    return pd.read_parquet(settings.DATA_DIR / "bot_sup_pairs.parquet")


@lru_cache
def load_pair_rules_df() -> pd.DataFrame:
    return pd.read_parquet(settings.DATA_DIR / "pair_rules.parquet")


# === MỚI: team champion performance cho scatter plot ===

@lru_cache
def load_team_champion_performance_df() -> pd.DataFrame:
    return pd.read_parquet(settings.DATA_DIR / "team_champion_performance.parquet")


# === MỚI: overview champion pick & winrate ===

@lru_cache
def load_overview_champion_stats_df() -> pd.DataFrame:
    return pd.read_parquet(settings.DATA_DIR / "overview_champion_stats.parquet")
