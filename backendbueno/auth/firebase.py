from pathlib import Path

import firebase_admin
from firebase_admin import auth, credentials
from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer

_CREDS_PATH = Path(__file__).resolve().parents[1] / "secrets" / "secret.json"

firebase_admin.initialize_app(credentials.Certificate(str(_CREDS_PATH)))

_bearer = HTTPBearer()


def verify_token(creds: HTTPAuthorizationCredentials = Depends(_bearer)) -> dict:
    try:
        return auth.verify_id_token(creds.credentials)
    except Exception:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Token inválido o expirado")
