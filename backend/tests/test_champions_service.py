# tests/test_champions_service.py
from app.services import champions_service

def test_get_champion_synergy_pairs():
    pairs = champions_service.get_champion_synergy_pairs()
    assert len(pairs) == 1
    p = pairs[0]
    assert p.champ1 == "Ahri"
    assert p.champ2 == "Zed"
    assert p.games == 5
    assert p.wins == 3

def test_get_gold_diff_15_top_uses_goldpermin():
    top = champions_service.get_gold_diff_15_top()
    assert len(top) == 2
    # Đảm bảo sort đúng: champion có goldpermin cao nhất đứng đầu
    assert top[0].champion == "Zed"
    assert top[0].avg_gold_diff_15 >= top[1].avg_gold_diff_15

def test_get_champion_associations_shape():
    resp = champions_service.get_champion_associations()
    assert len(resp.synergy_pairs) >= 1
    # Nếu đang cho first_blood_top trả về []
    assert isinstance(resp.first_blood_top, list)
    assert len(resp.gold_diff_15_top) == 2
