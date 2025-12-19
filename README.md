# LoL Esports Dashboard

> **Dashboard phân tích dữ liệu Liên Minh Huyền Thoại (LoL Esports)**  
> Hệ thống phân tích chuyên sâu với pipeline xử lý dữ liệu, backend API và frontend React hiện đại.

---

## 👥 Thành viên nhóm 5

| STT | Họ và Tên | Mã sinh viên |
|-----|-----------|--------------|
| 1 | Nguyễn Văn Huy | 23020379 |
| 2 | Hoàng Ngọc Nam | 23020403 |
| 3 | Trần Quốc Khánh | 23020387 |
| 4 | Nguyễn Anh Kiệt | 23020383 |

---

## 📋 Tổng quan dự án

Dashboard chuyên nghiệp phân tích dữ liệu thi đấu Liên Minh Huyền Thoại, cung cấp insights sâu sắc về:

- **Thống kê tổng quan**: Phân tích matches, players, teams, champions với winrate Blue/Red side
- **Hiệu suất chi tiết**: Đánh giá performance theo team, player và champion
- **Synergy Analysis**: Khai thác luật kết hợp (association rules) cho các lane combo như Mid–Jungle, Bot–Support
- **Trực quan hóa dữ liệu**: Charts và graphs tương tác với Nivo, Recharts và Force Graph

---

## 🏗️ Kiến trúc hệ thống

### Tech Stack

**Backend:**
- FastAPI 0.115.0
- Pandas 2.2.3 + PyArrow 17.0.0
- Pydantic 2.9.2
- Uvicorn 0.30.6
- CacheTools 5.5.0

**Frontend:**
- React 19.2.3
- TypeScript 5.9.3
- Vite 7.2.7
- React Router 7.10.1
- Axios 1.13.2
- TailwindCSS 4.1.18
- Nivo Charts (@nivo/bar, @nivo/pie, @nivo/line, @nivo/radar, @nivo/network)
- Recharts 3.6.0
- React Force Graph 2D 1.29.0

**Data Pipeline:**
- Python với Jupyter Notebook
- Pandas, NumPy
- PyArrow (Parquet format)

### Kiến trúc tổng thể

```
┌─────────────────┐      ┌──────────────────┐      ┌─────────────────┐
│   Pipeline      │ ───> │    Backend       │ ───> │    Frontend     │
│   (Jupyter)     │      │    (FastAPI)     │      │    (React)      │
└─────────────────┘      └──────────────────┘      └─────────────────┘
       │                         │                         │
   CSV/Parquet            Parquet Files              REST API
   Processing              Loading                  Visualization
```

### Luồng dữ liệu:

1. **Nguồn dữ liệu**: CSV raw từ Oracles Elixir (`pipeline/notebooks/2025_LoL_esports_match_data_from_OraclesElixir.csv`)
2. **Xử lý dữ liệu**: Notebook `01_data_cleaning.ipynb` làm sạch, chuẩn hóa, feature engineering
3. **Export**: Script `export_data.py` sinh các file Parquet cho backend (players, teams, champions, rules)
4. **Backend**: FastAPI load Parquet qua `app/utils/loaders.py`, expose REST API
5. **Frontend**: React components gọi API qua `apiClient.ts` và render charts/tables

---

## 📁 Cấu trúc thư mục

```
lol-esports-dashboard/
├── pipeline/
│   ├── notebooks/
│   │   ├── 01_data_cleaning.ipynb
│   │   └── 2025_LoL_esports_match_data_from_OraclesElixir.csv
│   └── export_data.py
│
├── backend/
│   ├── app/
│   │   ├── main.py                 # FastAPI app entry point
│   │   ├── api/                    # API endpoints
│   │   │   ├── overview.py         # GET /overview, /overview/champions
│   │   │   ├── players.py          # GET /players/*
│   │   │   ├── teams.py            # GET /teams/*
│   │   │   └── champions.py        # GET /champions/associations
│   │   ├── services/               # Business logic
│   │   │   ├── overview_service.py
│   │   │   ├── players_service.py
│   │   │   ├── teams_service.py
│   │   │   └── champions_service.py
│   │   ├── schemas/                # Pydantic models
│   │   │   ├── common.py
│   │   │   ├── overview.py
│   │   │   ├── players.py
│   │   │   ├── teams.py
│   │   │   └── champions.py
│   │   ├── core/
│   │   │   ├── config.py           # Settings (DATA_DIR, CACHE_TTL)
│   │   │   └── cache.py
│   │   └── utils/
│   │       └── loaders.py          # @lru_cache Parquet loaders
│   ├── data/
│   │   └── processed/              # *.parquet files (tạo từ pipeline)
│   ├── tests/
│   │   ├── conftest.py
│   │   ├── test_champions_service.py
│   │   └── test_teams_service.py
│   ├── Dockerfile
│   ├── requirements.txt
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── main.tsx                # App entry point
│   │   ├── router.tsx              # React Router config
│   │   ├── layouts/
│   │   │   └── DashboardLayout.tsx
│   │   ├── pages/
│   │   │   ├── OverviewPage.tsx
│   │   │   ├── PlayerStatsPage.tsx
│   │   │   ├── TeamStatsPage.tsx
│   │   │   └── ChampionStatsPage.tsx
│   │   ├── components/
│   │   │   ├── common/             # Reusable components
│   │   │   │   ├── Sidebar.tsx
│   │   │   │   ├── Navbar.tsx
│   │   │   │   ├── KPICard.tsx
│   │   │   │   └── DataTable.tsx
│   │   │   ├── overview/
│   │   │   │   ├── OverviewKPISection.tsx
│   │   │   │   └── OverviewChartsSection.tsx
│   │   │   └── players/
│   │   │       ├── PlayerSearchBar.tsx
│   │   │       ├── PlayerProfileCard.tsx
│   │   │       ├── PlayerChampionsChart.tsx
│   │   │       └── PlayerRulesSection.tsx
│   │   ├── charts/                 # Chart wrappers
│   │   │   ├── BarChart.tsx
│   │   │   ├── PieChart.tsx
│   │   │   ├── RadarChart.tsx
│   │   │   ├── LineChart.tsx
│   │   │   ├── StackedBarChart.tsx
│   │   │   ├── NetworkGraph.tsx
│   │   │   └── ChampionScatterChart.tsx
│   │   ├── services/
│   │   │   └── apiClient.ts        # Axios config
│   │   └── styles/
│   │       ├── globals.css
│   │       └── theme.ts
│   ├── index.html
│   ├── Dockerfile
│   └── package.json
│
├── docker-compose.yml
└── README.md
```

---

## 3. Pipeline chi tiết

### 3.1. Môi trường & cài đặt

Trong thư mục `pipeline/`:

cd pipeline
python -m venv venv
venv\Scripts\activate # hoặc source venv/bin/activate
pip install -r requirements.txt

text

### 3.2. Dữ liệu đầu vào

Đặt file raw Oracles Elixir vào `pipeline/data/raw/`:

- Ví dụ: `matches_2021_LCK.csv`, `matches_2022_LPL.csv`, v.v.
- Các cột tối thiểu cần:  
  `gameid`, `date`, `league`, `teamname`, `playername`, `side`, `position`,  
  `result`, `gamelength`, `dragons`, `opp_dragons`, `barons`, `opp_barons`,  
  `heralds`, `opp_heralds`, `towers`, `opp_towers`, `inhibitors`, `opp_inhibitors`,  
  `turretplates`, `opp_turretplates`, `pick1`…`pick5`, `ban1`…`ban5`,  
  `firstdragon`, `firstherald`, `firstbaron`, `firsttower`, vv.

### 3.3. Các notebook chính

- `01_data_cleaning.ipynb`  
  - Đọc raw.  
  - Chuẩn hóa tên cột, kiểu dữ liệu, lọc giải/season.  
  - Đưa về `team_df`, `player_df`, `champion_df` tạm thời.  

- `02_feature_engineering.ipynb`  
  - Tính thêm feature: KDA, CS/min, gold diff, objective rates.  
  - Tạo các bảng chuẩn để export (teams, team_matches, players, player_matches_champion, champions).  

- `03_association_rules.ipynb`  
  - Tạo bảng cho association rules:
    - Mid–Jungle pairs (`mid_jng_pairs.parquet`).  
    - Bot–Support pairs (`bot_sup_pairs.parquet`).  
    - `pair_rules.parquet` với `pair_type`, `role1`, `champ1`, `role2`, `champ2`, `support`, `confidence`, `lift`.  
  - Có thể dùng mlxtend/apyori để khai thác luật.

### 3.4. Export Parquet cho backend

`export_data.py` gom logic từ notebooks (không gửi ở đây), nhưng ý tưởng:

- Đọc `team_df` sạch từ intermediate.  
- Sinh:

  - `backend/data/processed/teams.parquet` – aggregate theo team.  
  - `backend/data/processed/team_matches.parquet` – match-level.  
  - `backend/data/processed/players.parquet`.  
  - `backend/data/processed/player_matches_champion.parquet`.  
  - `backend/data/processed/champions.parquet`.  
  - `backend/data/processed/mid_jng_pairs.parquet`.  
  - `backend/data/processed/bot_sup_pairs.parquet`.  
  - `backend/data/processed/pair_rules.parquet`.  
  - `backend/data/processed/team_champion_performance.parquet`.  
  - `backend/data/processed/overview_champion_stats.parquet`.  

Chạy:

cd pipeline
python export_data.py

text

Sau khi chạy xong, toàn bộ file `.parquet` backend cần phải nằm trong `backend/data/processed/`.

---

## 4. Backend (FastAPI)

### 4.1. Cài đặt & chạy

cd backend
python -m venv venv
venv\Scripts\activate # hoặc source venv/bin/activate
pip install -r requirements.txt

chạy server
uvicorn app.main:app --reload

text

API docs: `http://localhost:8000/docs`  
Healthcheck: `GET /health`

### 4.2. Config

`app/core/config.py` định nghĩa:

- `DATA_DIR` → `backend/data/processed`.  
- CORS origins (mặc định cho `http://localhost:5173` và `http://127.0.0.1:5173`).  
- Các option khác (TTL cache, v.v. nếu dùng).

### 4.3. Loaders

`app/utils/loaders.py` chứa các hàm `@lru_cache` đọc Parquet:

- `load_players_df()`, `load_teams_df()`, `load_teams_matches_df()`,  
  `load_champions_df()`, `load_player_rules_df()`, `load_champion_rules_df()`,  
  `load_player_matches_champion_df()`,  
  `load_mid_jng_pairs_df()`, `load_bot_sup_pairs_df()`, `load_pair_rules_df()`,  
  `load_team_champion_performance_df()`,  
  `load_overview_champion_stats_df()`.

### 4.4. API Overview

- `GET /overview`  
  Trả `OverviewStats`:

{
"total_matches": 9922,
"total_players": 2923,
"total_teams": 443,
"total_champions": 171,
"blue_side_winrate": 0.534,
"red_side_winrate": 0.466
}

text

- `GET /overview/champions?limit=50`  
Trả list `OverviewChampionStat` đã sort theo games desc rồi winrate desc:

[
{ "champion": "Xayah", "games": 300, "wins": 165, "winrate": 0.55 },
...
]

text

### 4.5. API Teams

- `GET /teams/{name}` → `TeamDetail` (games, wins, losses, winrate, avg_gamelength).  
- `GET /teams/{name}/objectives` → `TeamObjectiveStats` (dragons, barons, heralds, towers, inhibitors, turretplates, opp_*).  
- `GET /teams/{name}/matches?page=&size=` → `PaginatedResponse[TeamMatchRow]` cho Match History (có `opponent`).  
- `GET /teams/{name}/champions` → list `TeamChampionPerformance` (champion, games, wins, winrate) dùng cho scatter plot.

### 4.6. API Champions

- `GET /champions/associations` → trả synergy pairs & stats để vẽ network graph và bảng rules:
- `synergy_pairs` (pair_type, role1, champ1, role2, champ2, support, confidence, lift).  
- `mid_jng_top`, `bot_sup_top`, `first_blood_top`, `gold_diff_15_top`.

Các route khác cho players, rules tương tự.

---

## 5. Frontend (React + TypeScript)

### 5.1. Cài đặt & chạy

cd frontend
npm install # hoặc yarn / pnpm
npm run dev # Vite dev server, mặc định http://localhost:5173

text

`src/services/apiClient.ts` cấu hình baseURL (ví dụ `http://localhost:8000`).

### 5.2. Layout & router

- `DashboardLayout.tsx` – layout chung: sidebar, navbar, content area.  
- `router.tsx` – định tuyến các page:
  - `/` → `OverviewPage`.  
  - `/players` → `PlayerStatsPage`.  
  - `/teams` → `TeamStatsPage`.  
  - `/champions` → `ChampionStatsPage`.

### 5.3. OverviewPage

`src/pages/OverviewPage.tsx`:

- Call:

api.get<OverviewStats>("/overview")
api.get<OverviewChampionStat[]>("/overview/champions?limit=50")

text

- Hiển thị:
- `KPICard` cho total matches, players, teams, champions.  
- `PieChart` “Blue vs Red Winrate”.  
- `BarChart` “Winrate by Side (%)”.  
- `DataTable` cho “Champion Pick & Winrate” sorted theo games desc.

### 5.4. TeamStatsPage

`src/pages/TeamStatsPage.tsx`:

- Input: ô text cho `teamName` (default `T1`).
- Call:
- `/teams/{teamName}` → KPIs.  
- `/teams/{teamName}/objectives` → bar + stacked bar.  
- `/teams/{teamName}/matches` → DataTable Match History.  
- `/teams/{teamName}/champions` → scatter chart.

- Charts:
- `BarChart` – Objectives per Game.  
- `StackedBarChart` – Dragons: Own vs Opponent.  
- `ChampionScatterChart` – X = games, Y = winrate, tooltip hiển thị champion, games, winrate.

### 5.5. ChampionStatsPage

`src/pages/ChampionStatsPage.tsx`:

- Call `/champions/associations`.  
- Render:
- `NetworkGraph` – synergy network (Mid–Jungle và Bot–Support).  
- `BarChart` – Top First Blood champions.  
- `BarChart` – Top Gold Diff @15 champions.  
- `DataTable` – Synergy rules (lane, pair, support, confidence, lift).

### 5.6. Common components

- `KPICard` – card hiển thị 1 số KPI với title.  
- `DataTable` – bảng generic dùng cho Match History, champion rank, synergy rules.  
- `Sidebar`, `Navbar` – điều hướng dashboard.

### 5.7. Charts

- `BarChart.tsx`, `PieChart.tsx`, `RadarChart.tsx`, `LineChart.tsx` – wrappers quanh lib chart (ví dụ Recharts hoặc Nivo).  
- `NetworkGraph.tsx` – wrapper quanh `react-force-graph-2d` để vẽ graph synergy.  
- `ChampionScatterChart.tsx` – scatter chart dùng Recharts, custom tooltip.

---
---

## 🚀 Hướng dẫn cài đặt và chạy

### 1. Pipeline - Xử lý dữ liệu

**Yêu cầu:** Python 3.11+, Jupyter Notebook

```bash
cd pipeline
python -m venv venv
venv\Scripts\activate  # Windows

pip install pandas numpy pyarrow jupyter mlxtend
jupyter notebook
# Chạy 01_data_cleaning.ipynb
```

**Output:** Tạo file Parquet trong `backend/data/processed/`

---

### 2. Backend - FastAPI

**Yêu cầu:** Python 3.11+, File Parquet từ pipeline

```bash
cd backend
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt

# Chạy server
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

**API Docs:** `http://localhost:8000/docs`

---

### 3. Frontend - React + Vite

**Yêu cầu:** Node.js 20+

```bash
cd frontend
npm install

# Tạo .env
echo VITE_API_BASE_URL=http://localhost:8000 > .env

npm run dev  # http://localhost:5173
```

---

### 4. Docker (Optional)

```bash
docker-compose up --build
```

---

## 📊 Tính năng Dashboard

### Overview Page (`/`)
- KPI Cards: Matches, Players, Teams, Champions
- Charts: Blue/Red winrate, Champion rankings

### Player Stats (`/players`)
- Search & Profile
- Champion performance
- Lane synergy rules

### Team Stats (`/teams`)
- Team details & objectives
- Match history
- Champion scatter plot

### Champion Stats (`/champions`)
- Network graph (Mid-Jungle, Bot-Support synergy)
- First blood & gold diff analysis
- Association rules table

---

## 🛠️ Tech Stack

**Backend:** FastAPI, Pandas, PyArrow, Pydantic  
**Frontend:** React 19, TypeScript, Vite, TailwindCSS, Nivo, Recharts  
**Data:** Jupyter, Pandas, MLxtend

---

## 💡 Mở rộng

- Filter theo giải đấu (LCK, LPL, Worlds)
- Thêm metrics: gold diff @10, vision score, ban rate
- Cải thiện caching và lazy loading
- Sort & filter tables
- Tooltips giải thích metrics

---

## 📝 License & Credits

**Data Source:** [Oracle's Elixir](https://oracleselixir.com/)  
**Project:** LoL Esports Analytics Dashboard  
**Team:** Nhóm 5 - Data Science Project

