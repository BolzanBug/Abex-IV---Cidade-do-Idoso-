from http import HTTPStatus


def test_post_noticia_forbidden_for_idoso(client, token):
    r = client.post(
        '/noticias',
        headers={'Authorization': f'Bearer {token}'},
        json={
            'titulo': 'T',
            'descricao': 'D',
            'fonte': 'https://example.com',
        },
    )
    assert r.status_code == HTTPStatus.FORBIDDEN


def test_post_noticia_staff(client, staff_token):
    r = client.post(
        '/noticias',
        headers={'Authorization': f'Bearer {staff_token}'},
        json={
            'titulo': 'Comunicado interno',
            'descricao': 'Texto do comunicado.',
            'fonte': 'https://cidadeidoso.example/news/1',
        },
    )
    assert r.status_code == HTTPStatus.CREATED
    body = r.json()
    assert body['titulo'] == 'Comunicado interno'
    nid = body['id']

    r_patch = client.patch(
        f'/noticias/{nid}',
        headers={'Authorization': f'Bearer {staff_token}'},
        json={'titulo': 'Atualizado'},
    )
    assert r_patch.status_code == HTTPStatus.OK
    assert r_patch.json()['titulo'] == 'Atualizado'

    r_del = client.delete(
        f'/noticias/{nid}',
        headers={'Authorization': f'Bearer {staff_token}'},
    )
    assert r_del.status_code == HTTPStatus.NO_CONTENT


def test_cardapio_crud_staff(client, staff_token, sample_menu):
    mid = sample_menu[0].id
    r_put = client.put(
        f'/cardapio/itens/{mid}',
        headers={'Authorization': f'Bearer {staff_token}'},
        json={'titulo': 'Almoço revisado'},
    )
    assert r_put.status_code == HTTPStatus.OK
    assert r_put.json()['titulo'] == 'Almoço revisado'

    r_post = client.post(
        '/cardapio/itens',
        headers={'Authorization': f'Bearer {staff_token}'},
        json={
            'dia': 'Terça-feira',
            'ordem_dia': 2,
            'ordem_refeicao': 1,
            'refeicao': 'Almoço',
            'titulo': 'Novo prato',
            'descricao': 'Descrição.',
            'imagem_url': 'https://example.com/n.jpg',
        },
    )
    assert r_post.status_code == HTTPStatus.CREATED
    new_id = r_post.json()['id']

    r_del = client.delete(
        f'/cardapio/itens/{new_id}',
        headers={'Authorization': f'Bearer {staff_token}'},
    )
    assert r_del.status_code == HTTPStatus.NO_CONTENT


def test_atividade_crud_e_presenca(client, staff_token, user, token):
    r_create = client.post(
        '/atividades/',
        headers={'Authorization': f'Bearer {staff_token}'},
        json={
            'titulo': 'Bingo',
            'hora': '14:00',
            'data': 'Sexta',
            'imagem_url': 'https://example.com/bingo.jpg',
        },
    )
    assert r_create.status_code == HTTPStatus.CREATED
    aid = r_create.json()['id']

    client.post(
        '/atividades/inscricoes',
        headers={'Authorization': f'Bearer {token}'},
        json={'activity_id': aid},
    )

    r_ins = client.get(
        f'/atividades/{aid}/inscricoes',
        headers={'Authorization': f'Bearer {staff_token}'},
    )
    assert r_ins.status_code == HTTPStatus.OK
    ins = r_ins.json()['inscricoes']
    assert len(ins) == 1
    assert ins[0]['user_id'] == user.id

    d = '2026-03-24'
    r_pres_get = client.get(
        f'/atividades/{aid}/presenca',
        params={'data': d},
        headers={'Authorization': f'Bearer {staff_token}'},
    )
    assert r_pres_get.status_code == HTTPStatus.OK
    assert r_pres_get.json()['linhas'][0]['present'] is None

    r_pres_put = client.put(
        f'/atividades/{aid}/presenca',
        headers={'Authorization': f'Bearer {staff_token}'},
        json={
            'user_id': user.id,
            'data': d,
            'present': True,
        },
    )
    assert r_pres_put.status_code == HTTPStatus.OK
    assert r_pres_put.json()['linhas'][0]['present'] is True

    r_del = client.delete(
        f'/atividades/{aid}',
        headers={'Authorization': f'Bearer {staff_token}'},
    )
    assert r_del.status_code == HTTPStatus.NO_CONTENT


def test_presenca_rejeita_sem_inscricao(
    client, staff_token, other_user, sample_activities
):
    aid = sample_activities[0].id
    r = client.put(
        f'/atividades/{aid}/presenca',
        headers={'Authorization': f'Bearer {staff_token}'},
        json={
            'user_id': other_user.id,
            'data': '2026-01-15',
            'present': True,
        },
    )
    assert r.status_code == HTTPStatus.BAD_REQUEST
