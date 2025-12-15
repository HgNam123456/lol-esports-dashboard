# tests/conftest.py
import pandas as pd
import pytest

# Fake data cho champions
@pytest.fixture
def fake_champions_df():
    data = {
        "champion": ["Ahri", "Zed"],
        "games": [10, 8],
        "wins": [6, 5],
        "kills": [5.0, 7.0],
        "deaths": [3.0, 4.0],
        "assists": [6.0, 5.0],
        "dpm": [500, 600],
        "damageshare": [0.25, 0.3],
        "visionscore": [30, 25],
        "goldpermin": [400, 420],
        "winrate": [0.6, 0.625],
    }
    return pd.DataFrame(data)

@pytest.fixture(autouse=True)
def patch_loaders(monkeypatch, fake_champions_df):
    from app import utils

    def _load_champions_df():
        return fake_champions_df

    def _load_champion_rules_df():
        import pandas as pd
        df = pd.DataFrame(
            {
                "rule_type": ["synergy"],
                "champ1": ["Ahri"],
                "champ2": ["Zed"],
                "games": [5],
                "wins": [3],
                "winrate": [0.6],
                "lift": [1.2],
            }
        )
        return df

    monkeypatch.setattr("app.utils.loaders.load_champions_df", _load_champions_df)
    monkeypatch.setattr("app.utils.loaders.load_champion_rules_df", _load_champion_rules_df)
    yield
