import logging
import secrets
from http import HTTPStatus
from typing import Annotated

from fastapi import APIRouter, Depends
from fastapi.responses import JSONResponse
from pydantic import BaseModel, EmailStr
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from sistema_provas.database import get_session
from sistema_provas.models import User

logger = logging.getLogger(__name__)

router = APIRouter(tags=['password'])
Session = Annotated[AsyncSession, Depends(get_session)]


class PasswordResetRequestBody(BaseModel):
    email: EmailStr


@router.post('/password/reset-request')
async def solicitar_redefinicao_senha(
    body: PasswordResetRequestBody,
    session: Session,
):
    """
    Compatível com `esqueci-senha.js`: sucesso = HTTP 200; erro usa chave `message`.
    Em produção, enviar e-mail com link contendo o token (aqui apenas registrado).
    """
    user = await session.scalar(select(User).where(User.email == body.email))

    if not user:
        return JSONResponse(
            status_code=HTTPStatus.NOT_FOUND,
            content={
                'message': 'E-mail não encontrado ou inválido.',
            },
        )

    token = secrets.token_urlsafe(32)
    logger.info(
        'Solicitação de redefinição de senha para %s (token de desenvolvimento: %s)',
        body.email,
        token,
    )

    return JSONResponse(status_code=HTTPStatus.OK, content={})
