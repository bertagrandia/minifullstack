import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT))

from database import SessionLocal
from models.bubbletea import BubbleTea

bubbleteas = [
    BubbleTea(nombre="Matcha Latte", tipo_bubbletea="latte", descripcion="Té verde matcha con leche cremosa", precio=4.90, stock=20),
    BubbleTea(nombre="Fresa Clásica", tipo_bubbletea="clasica", descripcion="Té negro con sirope de fresa y perlas", precio=4.50, stock=25),
    BubbleTea(nombre="Mango Passion", tipo_bubbletea="frutal", descripcion="Mango con maracuyá y perlas de tapioca", precio=5.00, stock=18),
    BubbleTea(nombre="Chocolate Oreo", tipo_bubbletea="cremosa", descripcion="Base de chocolate con trozos de Oreo", precio=5.50, stock=15),
    BubbleTea(nombre="Lychee Slush", tipo_bubbletea="slush", descripcion="Granizado de lychee con perlas de popping", precio=5.20, stock=12),
    BubbleTea(nombre="Brown Sugar Milk", tipo_bubbletea="latte", descripcion="Leche fresca con caramelo de azúcar moreno", precio=5.80, stock=30),
    BubbleTea(nombre="Melocotón Oolong", tipo_bubbletea="clasica", descripcion="Té Oolong con melocotón natural", precio=4.70, stock=22),
    BubbleTea(nombre="Coco Pandan", tipo_bubbletea="cremosa", descripcion="Leche de coco con extracto de pandan", precio=5.10, stock=10),
    BubbleTea(nombre="Melón Yakult", tipo_bubbletea="frutal", descripcion="Melón verde con yakult y aloe vera", precio=5.30, stock=14),
    BubbleTea(nombre="Ube Purple", tipo_bubbletea="latte", descripcion="Ñame morado con leche condensada", precio=5.60, stock=8),
    BubbleTea(nombre="Maracuyá Tropical", tipo_bubbletea="frutal", descripcion="Maracuyá con piña y perlas de tapioca", precio=4.80, stock=20),
    BubbleTea(nombre="Chai Especiado", tipo_bubbletea="latte", descripcion="Té chai con canela, cardamomo y leche", precio=5.00, stock=16),
    BubbleTea(nombre="Limón Menta", tipo_bubbletea="slush", descripcion="Granizado de limón con hojas de menta fresca", precio=4.60, stock=25),
    BubbleTea(nombre="Flan Milk Tea", tipo_bubbletea="cremosa", descripcion="Té con capa de flan japonés encima", precio=6.00, stock=10),
    BubbleTea(nombre="Sandía Popping", tipo_bubbletea="frutal", descripcion="Sandía fresca con perlas de popping de fresa", precio=5.20, stock=18),
]

db = SessionLocal()
db.add_all(bubbleteas)
db.commit()
print(f"{len(bubbleteas)} bubbleteas añadidas correctamente.")
db.close()
