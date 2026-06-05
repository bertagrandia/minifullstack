from sqlalchemy import Boolean, Column, String

from database import Base


class User(Base):
    __tablename__ = "user"

    id = Column(String, primary_key=True)
    name = Column(String(100), nullable=False)
    surname = Column(String(100), nullable=False)
    email = Column(String(200), nullable=False, unique=True)
    birth_date = Column(String(20), nullable=False)
    active = Column(Boolean, nullable=False, default=True)
    notifications = Column(Boolean, nullable=False, default=False)
