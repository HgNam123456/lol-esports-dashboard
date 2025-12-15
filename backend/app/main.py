# backend/app/main.py
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api import overview, players, teams, champions

app = FastAPI(title="LoL Esports Analytics API")

# CORS config
origins = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,      # hoặc ["*"] nếu chỉ dùng local
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Routers
# overview.py đã có prefix="/overview", tags=["overview"]
app.include_router(overview.router)
app.include_router(players.router, prefix="/players", tags=["players"])
app.include_router(teams.router, prefix="/teams", tags=["teams"])
app.include_router(champions.router)   # giữ như cũ (router bên trong tự set prefix)

@app.get("/health")
def health():
    return {"status": "ok"}
