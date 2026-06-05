from fastapi import APIRouter, Depends, status
from pydantic import BaseModel
from sqlalchemy.orm import Session

from database import SessionLocal
from models.user import User


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


class UserIn(BaseModel):
    id: str
    name: str
    surname: str
    email: str
    birth_date: str
    active: bool = True
    notifications: bool = False


router = APIRouter(
    prefix="/users",
    tags=["users"],
)


@router.get("/")
def list_users(db: Session = Depends(get_db)):
    return db.query(User).all()


@router.post("/", status_code=status.HTTP_201_CREATED)
def create_user(data: UserIn, db: Session = Depends(get_db)):
    item = User(**data.model_dump())
    db.add(item)
    db.commit()
    db.refresh(item)
    return item
