from http import HTTPStatus


def test_listar_cardapio(client, sample_menu):
    response = client.get('/cardapio/')
    assert response.status_code == HTTPStatus.OK
    data = response.json()
    assert 'itens' in data
    assert len(data['itens']) == len(sample_menu)
    assert data['itens'][0]['dia'] == 'Segunda-feira'
    assert data['itens'][0]['refeicao'] == 'Almoço'
    assert data['itens'][1]['refeicao'] == 'Jantar'
