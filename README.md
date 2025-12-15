# lol-esports-dashboard
# LoL Esports Dashboard

Dashboard phân tích dữ liệu Liên Minh Huyền Thoại (LoL Esports) với pipeline xử lý dữ liệu, backend API và frontend React.  
Mục tiêu:

- Trực quan hóa thống kê tổng quan giải đấu (matches, players, teams, champions, winrate Blue/Red).
- Phân tích hiệu suất theo team, player, champion.
- Khai thác luật kết hợp (synergy rules) như Mid–Jungle, Bot–Support.

---

## 1. Kiến trúc tổng thể

Project gồm ba phần chính:

- **pipeline/** – Notebook + script Python để xử lý dữ liệu raw và export các file Parquet cho backend.
- **backend/** – FastAPI đọc Parquet, cung cấp REST API cho frontend.
- **frontend/** – React + TypeScript hiển thị dashboard, charts và tables.

Luồng dữ liệu:

1. Raw CSV/Parquet từ Oracles Elixir được đặt trong `pipeline/data/raw/`.
2. Notebook trong `pipeline/notebooks/` xử lý, làm sạch, feature engineering, tìm association rules.
3. `export_data.py` sinh ra các Parquet cuối cùng trong `backend/data/processed/`.
4. Backend load các Parquet (qua `utils/loaders.py`), build các service và expose API (`/overview`, `/teams/...`, `/players/...`, `/champions/...`).
5. Frontend gọi API qua `src/services/apiClient.ts` và render thành các page: Overview, Players, Teams, Champions.

---

## 2. Cấu trúc thư mục

project2

lol-esports-dashboard/
│
├── pipeline/
│   ├── data/
│   │   ├── raw/                # CSV/Parquet gốc từ Oracles Elixir
│   │   ├── intermediate/       # file tạm trong quá trình xử lý
│   │   └── processed/          # output cuối, dùng cho debug
│   │
│   ├── notebooks/
│   │   ├── 01_data_cleaning.ipynb
│   │   ├── 02_feature_engineering.ipynb
│   │   └── 03_association_rules.ipynb
│   │
│   ├── export_data.py          # script tách từ .ipynb → file cho backend
│   └── requirements.txt
│
├── backend/
│   ├── app/
│   │   ├── api/
│   │   │   ├── overview.py
│   │   │   ├── players.py
│   │   │   ├── teams.py
│   │   │   └── champions.py
│   │   │
│   │   ├── services/
│   │   │   ├── overview_service.py
│   │   │   ├── players_service.py
│   │   │   ├── teams_service.py
│   │   │   └── champions_service.py
│   │   │
│   │   ├── schemas/
│   │   │   ├── common.py
│   │   │   ├── overview.py
│   │   │   ├── players.py
│   │   │   ├── teams.py
│   │   │   └── champions.py
│   │   │
│   │   ├── core/
│   │   │   ├── config.py       # config path, cache TTL, CORS, ...
│   │   │   └── cache.py        # layer cache in‑memory
│   │   │
│   │   ├── utils/
│   │   │   └── loaders.py      # hàm đọc Parquet/CSV/JSON từ data/processed
│   │   │
│   │   └── main.py
│   │
│   ├── data/
│   │   └── processed/          # players.parquet, teams.parquet, rules_*.parquet, ...
│   │
│   ├── Dockerfile
│   └── requirements.txt
│
├── frontend/
│   ├── public/
│   │   └── logo.png
│   ├── src/
│   │   ├── layouts/
│   │   │   └── DashboardLayout.tsx
│   │   ├── pages/
│   │   │   ├── OverviewPage.tsx
│   │   │   ├── PlayerStatsPage.tsx
│   │   │   ├── TeamStatsPage.tsx
│   │   │   └── ChampionStatsPage.tsx
│   │   ├── components/
│   │   │   ├── common/
│   │   │   │   ├── Sidebar.tsx
│   │   │   │   ├── Navbar.tsx
│   │   │   │   ├── KPICard.tsx
│   │   │   │   └── DataTable.tsx
│   │   │   ├── overview/
│   │   │   │   ├── OverviewKPISection.tsx
│   │   │   │   └── OverviewChartsSection.tsx
│   │   │   ├── players/
│   │   │   │   ├── PlayerSearchBar.tsx
│   │   │   │   ├── PlayerProfileCard.tsx
│   │   │   │   ├── PlayerChampionsChart.tsx
│   │   │   │   └── PlayerRulesSection.tsx
│   │   │   ├── teams/
│   │   │   └── champions/
│   │   ├── charts/
│   │   │   ├── BarChart.tsx
│   │   │   ├── PieChart.tsx
│   │   │   ├── RadarChart.tsx
│   │   │   ├── LineChart.tsx
│   │   │   └── NetworkGraph.tsx
│   │   ├── services/
│   │   │   └── apiClient.ts
│   │   ├── styles/
│   │   │   ├── theme.ts
│   │   │   └── globals.css
│   │   ├── main.tsx
│   │   └── router.tsx
│   │
│   ├── Dockerfile
│   └── package.json
│
├── docker-compose.yml
└── README.md

Dưới đây là README.md đầy đủ bạn có thể copy thẳng vào project.

text
# LoL Esports Dashboard

Dashboard phân tích dữ liệu Liên Minh Huyền Thoại (LoL Esports) với pipeline xử lý dữ liệu, backend API và frontend React.  
Mục tiêu:

- Trực quan hóa thống kê tổng quan giải đấu (matches, players, teams, champions, winrate Blue/Red).
- Phân tích hiệu suất theo team, player, champion.
- Khai thác luật kết hợp (synergy rules) như Mid–Jungle, Bot–Support.

---

## 1. Kiến trúc tổng thể

Project gồm ba phần chính:

- **pipeline/** – Notebook + script Python để xử lý dữ liệu raw và export các file Parquet cho backend.
- **backend/** – FastAPI đọc Parquet, cung cấp REST API cho frontend.
- **frontend/** – React + TypeScript hiển thị dashboard, charts và tables.

Luồng dữ liệu:

1. Raw CSV/Parquet từ Oracles Elixir được đặt trong `pipeline/data/raw/`.
2. Notebook trong `pipeline/notebooks/` xử lý, làm sạch, feature engineering, tìm association rules.
3. `export_data.py` sinh ra các Parquet cuối cùng trong `backend/data/processed/`.
4. Backend load các Parquet (qua `utils/loaders.py`), build các service và expose API (`/overview`, `/teams/...`, `/players/...`, `/champions/...`).
5. Frontend gọi API qua `src/services/apiClient.ts` và render thành các page: Overview, Players, Teams, Champions.

---

## 2. Cấu trúc thư mục

project2/
└── lol-esports-dashboard/
├── pipeline/
│ ├── data/
│ │ ├── raw/ # CSV/Parquet gốc từ Oracles Elixir
│ │ ├── intermediate/ # file tạm trong quá trình xử lý (debug, join, vv.)
│ │ └── processed/ # output cuối dùng cho debug pipeline
│ │
│ ├── notebooks/
│ │ ├── 01_data_cleaning.ipynb
│ │ ├── 02_feature_engineering.ipynb
│ │ └── 03_association_rules.ipynb
│ │
│ ├── export_data.py # script tách logic từ notebooks, export Parquet cho backend
│ └── requirements.txt
│
├── backend/
│ ├── app/
│ │ ├── api/
│ │ │ ├── overview.py
│ │ │ ├── players.py
│ │ │ ├── teams.py
│ │ │ └── champions.py
│ │ │
│ │ ├── services/
│ │ │ ├── overview_service.py
│ │ │ ├── players_service.py
│ │ │ ├── teams_service.py
│ │ │ └── champions_service.py
│ │ │
│ │ ├── schemas/
│ │ │ ├── common.py
│ │ │ ├── overview.py
│ │ │ ├── players.py
│ │ │ ├── teams.py
│ │ │ └── champions.py
│ │ │
│ │ ├── core/
│ │ │ ├── config.py # config path DATA_DIR, CORS, v.v.
│ │ │ └── cache.py # cache in‑memory (LRU/TTL)
│ │ │
│ │ ├── utils/
│ │ │ └── loaders.py # hàm đọc Parquet từ backend/data/processed
│ │ │
│ │ └── main.py # tạo FastAPI app, CORS, include routers
│ │
│ ├── data/
│ │ └── processed/ # players.parquet, teams.parquet, rules_*.parquet, ...
│ │
│ ├── Dockerfile
│ └── requirements.txt
│
├── frontend/
│ ├── public/
│ │ └── logo.png
│ ├── src/
│ │ ├── layouts/
│ │ │ └── DashboardLayout.tsx
│ │ ├── pages/
│ │ │ ├── OverviewPage.tsx
│ │ │ ├── PlayerStatsPage.tsx
│ │ │ ├── TeamStatsPage.tsx
│ │ │ └── ChampionStatsPage.tsx
│ │ ├── components/
│ │ │ ├── common/
│ │ │ │ ├── Sidebar.tsx
│ │ │ │ ├── Navbar.tsx
│ │ │ │ ├── KPICard.tsx
│ │ │ │ └── DataTable.tsx
│ │ │ ├── overview/
│ │ │ │ ├── OverviewKPISection.tsx
│ │ │ │ └── OverviewChartsSection.tsx
│ │ │ ├── players/
│ │ │ ├── teams/
│ │ │ └── champions/
│ │ ├── charts/
│ │ │ ├── BarChart.tsx
│ │ │ ├── PieChart.tsx
│ │ │ ├── RadarChart.tsx
│ │ │ ├── LineChart.tsx
│ │ │ └── NetworkGraph.tsx
│ │ ├── services/
│ │ │ └── apiClient.ts
│ │ ├── styles/
│ │ │ ├── theme.ts
│ │ │ └── globals.css
│ │ ├── main.tsx
│ │ └── router.tsx
│ │
│ ├── Dockerfile
│ └── package.json
│
├── docker-compose.yml
└── README.md

text

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

## 6. Chạy toàn bộ bằng Docker (nếu dùng)

Nếu đã cấu hình `Dockerfile` cho backend/frontend và `docker-compose.yml`:

docker-compose up --build

text

- Backend: `http://localhost:8000`  
- Frontend: `http://localhost:5173` (hoặc port cấu hình trong compose)

---

## 7. Ghi chú & mở rộng

- Có thể thêm filter theo giải (LCK, LPL, Worlds) hoặc theo năm ngay từ pipeline để giảm dung lượng.  
- Có thể tối ưu phần đọc Parquet bằng cache TTL hoặc load lazy.  
- Có thể thêm metric mới: gold diff @10, vision score, champion ban rate, v.v.  
- Frontend có thể bổ sung:
  - Sort & filter trên bảng champion / match.  
  - Tooltip giải thích ý nghĩa `support`, `confidence`, `lift` trên synergy rules.  
- Khi update dữ liệu:
  1. Bỏ file raw mới vào `pipeline/data/raw/`.  
  2. Chạy lại notebooks / `export_data.py`.  
  3. Restart backend (để reload Parquet).
