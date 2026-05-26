from http import HTTPStatus

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from sistema_provas.routers import atividades, auth, cardapio, noticias, password, users
from sistema_provas.schemas import Message

app = FastAPI(title='Minha API') # Deixei apenas uma declaração

# --- INÍCIO DA CONFIGURAÇÃO DO CORS ---
# Regex cobre qualquer porta em localhost/127.0.0.1 (frontend estático, Live Server, etc.)
app.add_middleware(
    CORSMiddleware,
    allow_origin_regex=(
        r'https?://('
        r'localhost|127\.0\.0\.1|\[::1\]|0\.0\.0\.0'
        r'|192\.168\.\d{1,3}\.\d{1,3}'
        r'|10\.\d{1,3}\.\d{1,3}\.\d{1,3}'
        r')(:\d+)?'
    ),
    allow_credentials=True,
    allow_methods=['*'],  # Permite todos os métodos (GET, POST, PUT, DELETE)
    allow_headers=['*'],  # Permite todos os cabeçalhos
)

app.include_router(users.router)
app.include_router(auth.router)
app.include_router(noticias.router)
app.include_router(password.router)
app.include_router(atividades.router)
app.include_router(cardapio.router)

@app.get('/', status_code=HTTPStatus.OK, response_model=Message)
def read_root():
    return {'Message': 'Hello World'}