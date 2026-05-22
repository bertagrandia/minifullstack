from fastapi import FastAPI
from typing import List
from pydantic import BaseModel

app = FastAPI()

class BubbleTea(BaseModel):
    id: int
    nombre: str
    temperatura: str
    precio: float
    active: bool

    
@app.get("/bubbletea", response_model=List[BubbleTea])
def obtener_bubbletea() -> List[BubbleTea]:

    bubbleteas = [
        BubbleTea(
            id=1,
            nombre="Classic Milk Tea",
            temperatura="Frío",
            precio=4.50,
            active=True
        ),
        BubbleTea(
            id=2,
            nombre="Matcha Bubble Tea",
            temperatura="Caliente",
            precio=5.20,
            active=True
        ),
        BubbleTea(
            id=3,
            nombre="Strawberry Tea",
            temperatura="Frío",
            precio=4.80,
            active=False
        )
    ]

    return bubbleteas