import os
import sys
from pathlib import Path

from sqlalchemy import text

ROOT_DIR = Path(__file__).resolve().parents[1]
if str(ROOT_DIR) not in sys.path:
    sys.path.insert(0, str(ROOT_DIR))

from database import engine


def test_connection() -> None:
    try:
        with engine.connect() as connection:
            result = connection.execute(text("SELECT 1"))
            value = result.scalar_one()
            print("Database connection successful. SELECT 1 returned:", value)
    except Exception as exc:
        print("Database connection failed:", exc)
        sys.exit(1)


if __name__ == "__main__":
    test_connection()
