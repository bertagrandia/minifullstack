import json
import sys
from pathlib import Path

import requests
import google.auth.transport.requests
from google.oauth2 import service_account
import firebase_admin
from firebase_admin import auth, credentials

ROOT = Path(__file__).resolve().parents[1]
CREDS_PATH = ROOT / "secrets" / "secret.json"

# 1. Inicializar Firebase Admin
if not firebase_admin._apps:
    cred = credentials.Certificate(str(CREDS_PATH))
    firebase_admin.initialize_app(cred)

with open(CREDS_PATH) as f:
    sa = json.load(f)

project_id = sa["project_id"]

# 2. Obtener access token del service account para llamar APIs de Google
sa_creds = service_account.Credentials.from_service_account_file(
    str(CREDS_PATH),
    scopes=["https://www.googleapis.com/auth/cloud-platform"],
)
sa_creds.refresh(google.auth.transport.requests.Request())
access_token = sa_creds.token

# 3. Obtener la Web API Key del proyecto Firebase
resp = requests.get(
    f"https://firebase.googleapis.com/v1beta1/projects/{project_id}",
    headers={"Authorization": f"Bearer {access_token}"},
)
resp.raise_for_status()
project_data = resp.json()
web_api_key = project_data.get("webAppConfig", {}).get("apiKey") or project_data.get("resources", {})

# Intentar obtener la clave por otra vía si no está directamente
if not isinstance(web_api_key, str):
    resp2 = requests.get(
        f"https://firebase.googleapis.com/v1beta1/projects/{project_id}/webApps",
        headers={"Authorization": f"Bearer {access_token}"},
    )
    apps = resp2.json().get("apps", [])
    if apps:
        app_id = apps[0]["appId"]
        resp3 = requests.get(
            f"https://firebase.googleapis.com/v1beta1/projects/{project_id}/webApps/{app_id}/config",
            headers={"Authorization": f"Bearer {access_token}"},
        )
        web_api_key = resp3.json().get("apiKey")

if not web_api_key:
    print("No se pudo obtener la Web API Key automáticamente.")
    print("Ve a Firebase Console → Configuración del proyecto → General → 'Clave de API web'")
    sys.exit(1)

print(f"Web API Key obtenida: {web_api_key[:10]}...")

# 4. Crear custom token para un UID de prueba
custom_token = auth.create_custom_token("test-user-dev")

# 5. Intercambiar custom token por ID token
resp4 = requests.post(
    f"https://identitytoolkit.googleapis.com/v1/accounts:signInWithCustomToken?key={web_api_key}",
    json={"token": custom_token.decode(), "returnSecureToken": True},
)
resp4.raise_for_status()
id_token = resp4.json()["idToken"]

print("\n--- TOKEN DE PRUEBA ---")
print(id_token)
print("\nUsa este token así:")
print(f'Authorization: Bearer {id_token[:40]}...')
print("\nO en PowerShell:")
print(f'$token = "{id_token}"')
print('Invoke-RestMethod -Uri "http://127.0.0.1:8000/bubbleteas/" -Headers @{ Authorization = "Bearer $token" }')
