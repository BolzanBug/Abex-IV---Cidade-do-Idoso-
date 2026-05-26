from http import HTTPStatus


def test_catalogo_sem_autenticacao(client, sample_activities):
    response = client.get('/atividades/catalogo')
    assert response.status_code == HTTPStatus.OK
    data = response.json()
    assert 'atividades' in data
    assert len(data['atividades']) == 2
    assert data['atividades'][0]['titulo'] == 'Yoga Bloco A1'
    assert data['atividades'][0]['hora'] == '15:00h'


def test_minhas_inscricoes_sem_token(client):
    response = client.get('/atividades/minhas-inscricoes')
    assert response.status_code == HTTPStatus.UNAUTHORIZED


def test_minhas_inscricoes_vazio(client, user, token):
    response = client.get(
        '/atividades/minhas-inscricoes',
        headers={'Authorization': f'Bearer {token}'},
    )
    assert response.status_code == HTTPStatus.OK
    assert response.json() == {'inscricoes': []}


def test_inscrever_listar_e_cancelar(client, user, token, sample_activities):
    act_id = sample_activities[0].id

    r_create = client.post(
        '/atividades/inscricoes',
        headers={'Authorization': f'Bearer {token}'},
        json={'activity_id': act_id},
    )
    assert r_create.status_code == HTTPStatus.CREATED
    body = r_create.json()
    assert body['status'] == 'confirmado'
    assert body['atividade']['id'] == act_id
    enrollment_id = body['id']

    r_dup = client.post(
        '/atividades/inscricoes',
        headers={'Authorization': f'Bearer {token}'},
        json={'activity_id': act_id},
    )
    assert r_dup.status_code == HTTPStatus.CONFLICT

    r_list = client.get(
        '/atividades/minhas-inscricoes',
        headers={'Authorization': f'Bearer {token}'},
    )
    assert r_list.status_code == HTTPStatus.OK
    assert len(r_list.json()['inscricoes']) == 1

    r_cancel = client.post(
        f'/atividades/inscricoes/{enrollment_id}/cancelar',
        headers={'Authorization': f'Bearer {token}'},
    )
    assert r_cancel.status_code == HTTPStatus.OK
    assert r_cancel.json()['status'] == 'cancelado'

    r_cancel_again = client.post(
        f'/atividades/inscricoes/{enrollment_id}/cancelar',
        headers={'Authorization': f'Bearer {token}'},
    )
    assert r_cancel_again.status_code == HTTPStatus.BAD_REQUEST


def test_reinscricao_apos_cancelamento(client, user, token, sample_activities):
    act_id = sample_activities[1].id
    r1 = client.post(
        '/atividades/inscricoes',
        headers={'Authorization': f'Bearer {token}'},
        json={'activity_id': act_id},
    )
    eid = r1.json()['id']

    client.post(
        f'/atividades/inscricoes/{eid}/cancelar',
        headers={'Authorization': f'Bearer {token}'},
    )

    r2 = client.post(
        '/atividades/inscricoes',
        headers={'Authorization': f'Bearer {token}'},
        json={'activity_id': act_id},
    )
    assert r2.status_code == HTTPStatus.CREATED
    assert r2.json()['status'] == 'confirmado'


def test_inscricao_atividade_inexistente(client, user, token):
    response = client.post(
        '/atividades/inscricoes',
        headers={'Authorization': f'Bearer {token}'},
        json={'activity_id': 99999},
    )
    assert response.status_code == HTTPStatus.NOT_FOUND
