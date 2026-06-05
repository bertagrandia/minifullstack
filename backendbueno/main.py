from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from database import Base, engine
from routers.bubbletea import router as bubbletea_router
from routers.user import router as user_router

Base.metadata.create_all(bind=engine)

app = FastAPI(title="BubbleTea API")

app.add_middleware(
    CORSMiddleware,
    allow_origin_regex=r"http://(localhost|127\.0\.0\.1)(:\d+)?",
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(bubbletea_router)
app.include_router(user_router)


@app.get("/health")
def health():
    return {"status": "ok", "api": "BubbleTea API"}


if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="127.0.0.1", port=8001, reload=True)
