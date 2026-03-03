from http import HTTPStatus
from io import BytesIO

import pytest
from fastapi import UploadFile
from sqlalchemy import select
from sqlalchemy.orm import selectinload

from sistema_provas.models import ExamDefinition, QuestionDefinition
from sistema_provas.routers import exams as exams_router


class _FakeScanner:
    def __init__(self, *, answer_key=None, topics=None):
        self._answer_key = answer_key
        self._topics = topics

    def extract_answer_key(self, _pdf_path: str):
        return self._answer_key

    def extract_topics(self, _pdf_path: str):
        return self._topics


@pytest.mark.asyncio
async def test_create_exam_conflict_title(
    monkeypatch,
    client,
    session,
    tmp_path,
):
    monkeypatch.chdir(tmp_path)

    session.add(ExamDefinition(title='Minha Prova'))
    await session.commit()

    monkeypatch.setattr(
        exams_router,
        'ExamScanner',
        lambda: _FakeScanner(
            answer_key=[{'number': 1, 'correct_option': 'A'}]
        ),
    )

    resp = client.post(
        '/exams/create',
        data={'title': 'Minha Prova'},
        files={'file': ('gabarito.pdf', b'data', 'application/pdf')},
    )

    assert resp.status_code == HTTPStatus.CONFLICT
    assert resp.json()['detail'].startswith('Já existe uma prova')


def test_create_exam_bad_gabarito_returns_400(monkeypatch, client, tmp_path):
    monkeypatch.chdir(tmp_path)

    monkeypatch.setattr(
        exams_router,
        'ExamScanner',
        lambda: _FakeScanner(answer_key=[]),
    )

    resp = client.post(
        '/exams/create',
        data={'title': 'Prova X'},
        files={'file': ('gabarito.pdf', b'data', 'application/pdf')},
    )

    assert resp.status_code == HTTPStatus.BAD_REQUEST
    assert resp.json() == {'detail': 'Não foi possível ler o gabarito.'}


@pytest.mark.asyncio
async def test_create_exam_success_persists_questions(
    monkeypatch,
    client,
    session,
    tmp_path,
):
    monkeypatch.chdir(tmp_path)

    monkeypatch.setattr(
        exams_router,
        'ExamScanner',
        lambda: _FakeScanner(
            answer_key=[
                {
                    'number': 1,
                    'correct_option': 'C',
                    'source': 'ENADE',
                    'type': 'Objetiva',
                },
                {
                    'number': 2,
                    'correct_option': None,
                    'source': 'ENADE',
                    'type': 'Discursiva',
                },
            ]
        ),
    )

    resp = client.post(
        '/exams/create',
        data={'title': 'Prova Nova'},
        files={'file': ('gabarito.pdf', b'data', 'application/pdf')},
    )

    assert resp.status_code == HTTPStatus.CREATED
    body = resp.json()
    assert body['title'] == 'Prova Nova'
    assert {q['question_number'] for q in body['questions']} == {1, 2}  # noqa: PLR2004

    db_exam = await session.scalar(
        select(ExamDefinition).where(ExamDefinition.title == 'Prova Nova')
    )
    assert db_exam is not None


def test_enrich_exam_topics_404(monkeypatch, client, tmp_path):
    monkeypatch.chdir(tmp_path)

    monkeypatch.setattr(
        exams_router,
        'ExamScanner',
        lambda: _FakeScanner(topics=[{'number': 1, 'topic': 'X'}]),
    )

    resp = client.post(
        '/exams/999/upload-questions-pdf',
        files={'file': ('questoes.pdf', b'data', 'application/pdf')},
    )

    assert resp.status_code == HTTPStatus.NOT_FOUND
    assert resp.json() == {'detail': 'Prova não encontrada'}


@pytest.mark.asyncio
async def test_enrich_exam_topics_updates_matching_questions(
    monkeypatch,
    session,
    tmp_path,
):
    monkeypatch.chdir(tmp_path)

    exam = ExamDefinition(title='Prova T')
    exam.questions.append(
        QuestionDefinition(
            question_number=1,
            correct_option='A',
            source='ENADE',
            topic=None,
            question_type='Objetiva',
        )
    )
    exam.questions.append(
        QuestionDefinition(
            question_number=2,
            correct_option='B',
            source='ENADE',
            topic=None,
            question_type='Objetiva',
        )
    )
    session.add(exam)
    await session.commit()
    await session.refresh(exam, attribute_names=['questions'])

    monkeypatch.setattr(
        exams_router,
        'ExamScanner',
        lambda: _FakeScanner(
            topics=[
                {'number': 1, 'topic': 'Banco de Dados'},
                {'number': 999, 'topic': 'Ignorado'},
            ]
        ),
    )

    upload_file = UploadFile(
        filename='questoes.pdf',
        file=BytesIO(b'data'),
    )

    exam_after = await exams_router.enrich_exam_topics(
        exam_id=exam.id,
        file=upload_file,
        session=session,
    )

    assert exam_after.id == exam.id

    result = await session.execute(
        select(ExamDefinition)
        .options(selectinload(ExamDefinition.questions))
        .where(ExamDefinition.id == exam.id),
    )
    exam_db = result.scalar_one()

    q1 = next(q for q in exam_db.questions if q.question_number == 1)
    q2 = next(q for q in exam_db.questions if q.question_number == 2)  # noqa: PLR2004
    assert q1.topic == 'Banco de Dados'
    assert q2.topic is None
