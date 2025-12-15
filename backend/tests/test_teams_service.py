# tests/test_teams_service.py
from app.services import teams_service
import pandas as pd
import pytest

@pytest.fixture(autouse=True)
def patch_team_loader(monkeypatch):
    from app import utils

    def _load_matches_df():
        df = pd.DataFrame(
            {
                "teamname": ["T1", "T1"],
                "opponentname": ["GEN", "HLE"],
                "result": [1, 0],
                "dragons": [3, 2],
                "opp_dragons": [1, 3],
                "gamelength": [30, 35],
            }
        )
        return df

    monkeypatch.setattr("app.utils.loaders.load_matches_df", _load_matches_df)
    yield

def test_get_team_detail_basic():
    detail = teams_service.get_team_detail("T1")
    assert detail.name == "T1"
    assert detail.games == 2
    assert 0.0 <= detail.winrate <= 1.0

def test_get_team_objectives_has_fields():
    obj = teams_service.get_team_objectives("T1")
    assert obj.team == "T1"
    assert obj.dragons >= 0
    assert obj.opp_dragons >= 0
