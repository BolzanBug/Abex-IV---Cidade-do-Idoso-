from http import HTTPStatus


def test_reset_request_email_existente(client, user):
    response = client.post(
        '/password/reset-request',
        json={'email': user.email},
    )

    assert response.status_code == HTTPStatus.OK
    assert response.json() == {}


def test_reset_request_email_inexistente(client):
    response = client.post(
        '/password/reset-request',
        json={'email': 'naoexiste@example.com'},
    )

    assert response.status_code == HTTPStatus.NOT_FOUND
    assert response.json() == {
        'message': 'E-mail não encontrado ou inválido.',
    }
