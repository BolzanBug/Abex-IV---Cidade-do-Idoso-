from http import HTTPStatus
from io import BytesIO

import pytest
from fastapi import HTTPException, UploadFile
from sqlalchemy import select

from sistema_provas.models import (
    ExamDefinition,
    ProcessedExam,
    QuestionDefinition,
)
from sistema_provas.routers import upload as upload_router


class _FakeScanner:
    def __init__(self, *, students):
        self._students = students

    def process_pdf(self, _pdf_path: str):
        return self._students


def test_upload_student_exam_404(monkeypatch, client, tmp_path):
    monkeypatch.chdir(tmp_path)

    monkeypatch.setattr(
        upload_router,
        'ExamScanner',
        lambda: _FakeScanner(students=[]),
    )

    resp = client.post(
        '/upload/123',
        files={'file': ('alunos.pdf', b'data', 'application/pdf')},
    )

    assert resp.status_code == HTTPStatus.NOT_FOUND
    assert resp.json() == {'detail': 'Prova não encontrada'}


@pytest.mark.asyncio
async def test_upload_student_exam_404_direct(monkeypatch, session, tmp_path):
    monkeypatch.chdir(tmp_path)

    monkeypatch.setattr(
        upload_router,
        'ExamScanner',
        lambda: _FakeScanner(students=[]),
    )

    upload_file = UploadFile(
        filename='alunos.pdf',
        file=BytesIO(b'data'),
    )

    with pytest.raises(HTTPException) as exc:
        await upload_router.upload_student_exam(
            exam_id=999,
            file=upload_file,
            session=session,
        )

    assert exc.value.status_code == HTTPStatus.NOT_FOUND


@pytest.mark.asyncio
async def test_upload_student_exam_scores_and_persists(
    monkeypatch,
    client,
    session,
    tmp_path,
):
    monkeypatch.chdir(tmp_path)

    exam = ExamDefinition(title='Prova Score')
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
    # Questão sem gabarito deve ser ignorada no mapa
    exam.questions.append(
        QuestionDefinition(
            question_number=3,
            correct_option=None,
            source='ENADE',
            topic=None,
            question_type='Discursiva',
        )
    )
    session.add(exam)
    await session.commit()
    await session.refresh(exam, attribute_names=['questions'])

    monkeypatch.setattr(
        upload_router,
        'ExamScanner',
        lambda: _FakeScanner(
            students=[
                {'student_name': 'Ana', 'answers': {'1': 'A', '2': 'B'}},
                {'student_name': 'Bob', 'answers': {'1': 'A', '2': 'C'}},
            ]
        ),
    )

    resp = client.post(
        f'/upload/{exam.id}',
        files={'file': ('alunos.pdf', b'data', 'application/pdf')},
    )

    assert resp.status_code == HTTPStatus.OK
    body = resp.json()
    assert body['total_students'] == 2  # noqa: PLR2004
    assert {r['name'] for r in body['results']} == {'Ana', 'Bob'}
    scores = {r['name']: r['score'] for r in body['results']}
    assert scores['Ana'] == 10.0  # noqa: PLR2004
    assert scores['Bob'] == 5.0  # noqa: PLR2004

    rows = (await session.scalars(select(ProcessedExam))).all()
    assert len(rows) == 2  # noqa: PLR2004


@pytest.mark.asyncio
async def test_upload_student_exam_when_no_official_questions_score_zero(
    monkeypatch,
    client,
    session,
    tmp_path,
):
    monkeypatch.chdir(tmp_path)

    exam = ExamDefinition(title='Sem Questões')
    session.add(exam)
    await session.commit()
    await session.refresh(exam)

    monkeypatch.setattr(
        upload_router,
        'ExamScanner',
        lambda: _FakeScanner(
            students=[{'student_name': 'Ana', 'answers': {'1': 'A'}}]
        ),
    )

    resp = client.post(
        f'/upload/{exam.id}',
        files={'file': ('alunos.pdf', b'data', 'application/pdf')},
    )

    assert resp.status_code == HTTPStatus.OK
    assert resp.json()['results'][0]['score'] == 0.0


@pytest.mark.asyncio
async def test_upload_student_exam_scores_and_persists_direct(
    monkeypatch,
    session,
    tmp_path,
):
    monkeypatch.chdir(tmp_path)

    exam = ExamDefinition(title='Prova Score Direct')
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
        upload_router,
        'ExamScanner',
        lambda: _FakeScanner(
            students=[
                {'student_name': 'Ana', 'answers': {'1': 'A', '2': 'B'}},
                {'student_name': 'Bob', 'answers': {'1': 'A', '2': 'C'}},
            ]
        ),
    )

    upload_file = UploadFile(
        filename='alunos.pdf',
        file=BytesIO(b'data'),
    )

    body = await upload_router.upload_student_exam(
        exam_id=exam.id,
        file=upload_file,
        session=session,
    )

    assert body['total_students'] == 2  # noqa: PLR2004
    assert {r['name'] for r in body['results']} == {'Ana', 'Bob'}
    scores = {r['name']: r['score'] for r in body['results']}
    assert scores['Ana'] == 10.0  # noqa: PLR2004
    assert scores['Bob'] == 5.0  # noqa: PLR2004

    rows = (await session.scalars(select(ProcessedExam))).all()
    assert len(rows) == 2  # noqa: PLR2004


@pytest.mark.asyncio
async def test_upload_no_official_questions_score_zero_direct(
    monkeypatch,
    session,
    tmp_path,
):
    monkeypatch.chdir(tmp_path)

    exam = ExamDefinition(title='Sem Questões Direct')
    session.add(exam)
    await session.commit()
    await session.refresh(exam)

    monkeypatch.setattr(
        upload_router,
        'ExamScanner',
        lambda: _FakeScanner(
            students=[{'student_name': 'Ana', 'answers': {'1': 'A'}}]
        ),
    )

    upload_file = UploadFile(
        filename='alunos.pdf',
        file=BytesIO(b'data'),
    )

    body = await upload_router.upload_student_exam(
        exam_id=exam.id,
        file=upload_file,
        session=session,
    )

    assert body['total_students'] == 1  # noqa: PLR2004
    assert body['results'][0]['score'] == 0.0
