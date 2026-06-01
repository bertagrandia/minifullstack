from fastapi import APIRouter, Depends, HTTPException, status
from pydantic import BaseModel
from sqlalchemy.orm import Session

from database import SessionLocal
from models.bubbletea import BubbleTea


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


class BubbleTeaIn(BaseModel):
    nombre: str
    tipo_bubbletea: str
    descripcion: str | None = None
    precio: float
    stock: int = 0
    active: bool = True


router = APIRouter(
    prefix="/bubbleteas",
    tags=["bubbleteas"],
)


@router.get("/")
def list_bubbleteas(db: Session = Depends(get_db)):
    return db.query(BubbleTea).filter(BubbleTea.active == True).all()


@router.get("/{bubbletea_id}")
def get_bubbletea(bubbletea_id: int, db: Session = Depends(get_db)):
    item = db.query(BubbleTea).filter(BubbleTea.bubbletea_id == bubbletea_id).first()
    if not item:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="BubbleTea no encontrado")
    return item


@router.post("/", status_code=status.HTTP_201_CREATED)
def create_bubbletea(data: BubbleTeaIn, db: Session = Depends(get_db)):
    item = BubbleTea(**data.model_dump())
    db.add(item)
    db.commit()
    db.refresh(item)
    return item


@router.put("/{bubbletea_id}")
def update_bubbletea(bubbletea_id: int, data: BubbleTeaIn, db: Session = Depends(get_db)):
    item = db.query(BubbleTea).filter(BubbleTea.bubbletea_id == bubbletea_id).first()
    if not item:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="BubbleTea no encontrado")
    for field, value in data.model_dump().items():
        setattr(item, field, value)
    db.commit()
    db.refresh(item)
    return item


@router.delete("/{bubbletea_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_bubbletea(bubbletea_id: int, db: Session = Depends(get_db)):
    item = db.query(BubbleTea).filter(BubbleTea.bubbletea_id == bubbletea_id).first()
    if not item:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="BubbleTea no encontrado")
    db.delete(item)
    db.commit()
