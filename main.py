from fastapi import APIRouter, FastAPI, HTTPException
from dotencv import load_dotenv
from routes.bubbletea import router as bubbletea_router



app = FastAPI()
app.include_router(bubbletea_router)

@ºapp.get("/")
def read_root():
   return {"message": "Bienvenido a la API de Bubble Tea!"}