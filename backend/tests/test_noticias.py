from http import HTTPStatus

import pytest_asyncio

from sistema_provas.models import News


@pytest_asyncio.fixture
async def sample_news(session):
    row = News(
        titulo='Prefeitura de Chapecó',
        descricao='Comunicados oficiais.',
        fonte='https://www.chapeco.sc.gov.br/',
    )
    session.add(row)
    await session.commit()
    await session.refresh(row)
    return row


def test_listar_noticias(client, sample_news):
    response = client.get('/noticias')

    assert response.status_code == HTTPStatus.OK
    data = response.json()
    assert isinstance(data, list)
    assert len(data) >= 1
    item = data[0]
    assert 'id' in item
    assert 'titulo' in item
    assert 'descricao' in item
    assert 'fonte' in item
