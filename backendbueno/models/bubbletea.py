from sqlalchemy import Boolean, Column, Float, Integer, String

from database import Base

class BubbleTea(Base):
    __tablename__ = "bubbletea"

    bubbletea_id = Column(Integer, primary_key=True, autoincrement=True)
    nombre = Column(String(100), nullable=False)
    tipo_bubbletea = Column(String(100), nullable=False)
    descripcion = Column(String(500), nullable=True)
    precio = Column(Float, nullable=False)
    stock = Column(Integer, nullable=False, default=0)
    active = Column(Boolean, nullable=False, default=True)
