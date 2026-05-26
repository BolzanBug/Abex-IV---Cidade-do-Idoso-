from datetime import date
from typing import Optional

from pydantic import BaseModel, ConfigDict, EmailStr, Field


class Message(BaseModel):
    Message: str


class UserSchema(BaseModel):
    username: str
    email: EmailStr
    password: str

    # Novos campos opcionais na entrada (= None)
    first_name: Optional[str] = None
    last_name: Optional[str] = None
    phone: Optional[str] = None
    birth_date: Optional[date] = None
    gender: Optional[str] = None
    address: Optional[str] = None
    city: Optional[str] = None
    state: Optional[str] = None
    zip_code: Optional[str] = None


class UserPublic(BaseModel):
    username: str
    email: EmailStr
    id: int
    is_staff: bool = False
    first_name: Optional[str] = None
    last_name: Optional[str] = None
    model_config = ConfigDict(from_attributes=True)


class UserList(BaseModel):
    users: list[UserPublic]


class Token(BaseModel):
    access_token: str
    token_type: str


class FilterPage(BaseModel):
    offset: int = Field(ge=0, default=0)
    limit: int = Field(ge=0, default=10)


class AtividadeOut(BaseModel):
    id: int
    titulo: str
    hora: str
    data: str
    imagem_url: str


class InscricaoOut(BaseModel):
    id: int
    status: str
    atividade: AtividadeOut


class InscricaoCreate(BaseModel):
    activity_id: int = Field(ge=1)


class CatalogoAtividadesOut(BaseModel):
    atividades: list[AtividadeOut]


class MinhasInscricoesOut(BaseModel):
    inscricoes: list[InscricaoOut]


class CardapioItemOut(BaseModel):
    id: int
    dia: str
    ordem_dia: int
    refeicao: str
    titulo: str
    descricao: str
    imagem_url: str


class CardapioListaOut(BaseModel):
    itens: list[CardapioItemOut]


class CardapioItemCreate(BaseModel):
    dia: str = Field(max_length=60)
    ordem_dia: int = Field(ge=0)
    ordem_refeicao: int = Field(ge=0)
    refeicao: str = Field(max_length=40)
    titulo: str = Field(max_length=200)
    descricao: str = Field(max_length=600)
    imagem_url: str = Field(max_length=500)


class CardapioItemUpdate(BaseModel):
    dia: Optional[str] = Field(default=None, max_length=60)
    ordem_dia: Optional[int] = Field(default=None, ge=0)
    ordem_refeicao: Optional[int] = Field(default=None, ge=0)
    refeicao: Optional[str] = Field(default=None, max_length=40)
    titulo: Optional[str] = Field(default=None, max_length=200)
    descricao: Optional[str] = Field(default=None, max_length=600)
    imagem_url: Optional[str] = Field(default=None, max_length=500)


class NoticiaOut(BaseModel):
    id: int
    titulo: str
    descricao: str
    fonte: str
    model_config = ConfigDict(from_attributes=True)


class NoticiaCreate(BaseModel):
    titulo: str = Field(max_length=300)
    descricao: str = Field(max_length=2000)
    fonte: str = Field(max_length=800)


class NoticiaUpdate(BaseModel):
    titulo: Optional[str] = Field(default=None, max_length=300)
    descricao: Optional[str] = Field(default=None, max_length=2000)
    fonte: Optional[str] = Field(default=None, max_length=800)


class AtividadeCreate(BaseModel):
    titulo: str = Field(max_length=200)
    hora: str = Field(max_length=50)
    data: str = Field(max_length=120)
    imagem_url: str = Field(max_length=500)


class AtividadeUpdate(BaseModel):
    titulo: Optional[str] = Field(default=None, max_length=200)
    hora: Optional[str] = Field(default=None, max_length=50)
    data: Optional[str] = Field(default=None, max_length=120)
    imagem_url: Optional[str] = Field(default=None, max_length=500)


class InscritoOut(BaseModel):
    inscricao_id: int
    status: str
    user_id: int
    username: str
    first_name: Optional[str] = None
    last_name: Optional[str] = None


class InscricoesAtividadeOut(BaseModel):
    inscricoes: list[InscritoOut]


class PresencaLinhaOut(BaseModel):
    user_id: int
    username: str
    first_name: Optional[str] = None
    last_name: Optional[str] = None
    present: Optional[bool] = None


class PresencaListaOut(BaseModel):
    data: date
    linhas: list[PresencaLinhaOut]


class PresencaUpsert(BaseModel):
    user_id: int = Field(ge=1)
    data: date
    present: bool
