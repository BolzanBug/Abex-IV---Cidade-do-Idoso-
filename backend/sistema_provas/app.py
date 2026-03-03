from http import HTTPStatus

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from sistema_provas.routers import auth, users
from sistema_provas.schemas import Message

app = FastAPI(title='Minha API') # Deixei apenas uma declaração

# --- INÍCIO DA CONFIGURAÇÃO DO CORS ---
origins = [
    'http://localhost:3001',
    'http://0.0.0.0:3001',    # <-- SEM a barra (/) no final!
    'http://127.0.0.1:3001',  # <-- Adicionado por segurança
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=['*'],  # Permite todos os métodos (GET, POST, PUT, DELETE)
    allow_headers=['*'],  # Permite todos os cabeçalhos
)

app.include_router(users.router)
app.include_router(auth.router)

@app.get('/', status_code=HTTPStatus.OK, response_model=Message)
def read_root():
    return {'Message': 'Hello World'}