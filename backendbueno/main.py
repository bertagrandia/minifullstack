from fastapi import FastAPI

from database import Base, engine
from routers.bubbletea import router as bubbletea_router

Base.metadata.create_all(bind=engine)

app = FastAPI(title="BubbleTea API")
app.include_router(bubbletea_router)


@app.get("/health")
def health():
    return {"status": "ok", "api": "BubbleTea API"}
