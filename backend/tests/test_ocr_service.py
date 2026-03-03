import base64

import pytest

from sistema_provas.services import ocr_service
from sistema_provas.services.ocr_service import ExamScanner


class _FakeImage:
    def __init__(self, payload: bytes = b'img-bytes'):
        self._payload = payload

    def save(self, buffered, format=None, quality=None):  # noqa: A002
        buffered.write(self._payload)


class _FakeAnthropicResponse:
    def __init__(self, text: str):
        self.content = [type('C', (), {'text': text})()]


class _FakeAnthropicMessages:
    def __init__(
        self,
        *,
        response_text: str | None = None,
        raises: bool = False,
    ):
        self._response_text = response_text
        self._raises = raises
        self.last_kwargs = None

    def create(self, **kwargs):
        self.last_kwargs = kwargs
        if self._raises:
            raise RuntimeError('boom')
        return _FakeAnthropicResponse(self._response_text or '{}')


class _FakeAnthropicClient:
    def __init__(
        self,
        *,
        response_text: str | None = None,
        raises: bool = False,
    ):
        self.messages = _FakeAnthropicMessages(
            response_text=response_text,
            raises=raises,
        )


def test_encode_image_base64():
    raw = b'abc123'
    encoded = ExamScanner._encode_image(_FakeImage(payload=raw))

    assert encoded == base64.b64encode(raw).decode('utf-8')


@pytest.mark.parametrize(
    ('text', 'expected'),
    [
        ('{"a": 1}', {'a': 1}),
        ('```json\n{"a": 1}\n```', {'a': 1}),
        ('prefix [1, 2, 3] suffix', [1, 2, 3]),
        ('prefix {"x": "y"} suffix', {'x': 'y'}),
        ('not json at all', None),
        ('{broken', None),
    ],
)
def test_extract_json_from_text_variants(text, expected):
    assert ExamScanner._extract_json_from_text(text) == expected


def test_call_claude_vision_builds_payload_and_parses(monkeypatch):
    fake = _FakeAnthropicClient(response_text='{"ok": true}')

    def _fake_anthropic(*args, **kwargs):
        return fake

    monkeypatch.setattr(ocr_service.anthropic, 'Anthropic', _fake_anthropic)

    scanner = ocr_service.ExamScanner()
    data = scanner._call_claude_vision('b64', 'PROMPT')

    assert data == {'ok': True}
    assert fake.messages.last_kwargs['model'] == scanner.model
    assert fake.messages.last_kwargs['temperature'] == 0.0
    msg = fake.messages.last_kwargs['messages'][0]
    assert msg['role'] == 'user'
    assert msg['content'][0]['type'] == 'image'
    assert msg['content'][0]['source']['data'] == 'b64'
    assert msg['content'][1]['type'] == 'text'
    assert msg['content'][1]['text'] == 'PROMPT'


def test_call_claude_vision_handles_exception(monkeypatch):
    fake = _FakeAnthropicClient(raises=True)

    monkeypatch.setattr(ocr_service.anthropic, 'Anthropic', lambda **_: fake)

    scanner = ocr_service.ExamScanner()
    assert scanner._call_claude_vision('b64', 'PROMPT') is None


def _fake_two_pages():
    return [_FakeImage(), _FakeImage()]


def test_extract_topics_aggregates_all_pages(monkeypatch):
    monkeypatch.setattr(
        ocr_service,
        'convert_from_path',
        lambda _: _fake_two_pages(),
    )

    scanner = ocr_service.ExamScanner()
    monkeypatch.setattr(scanner, '_encode_image', lambda _: 'b64')

    calls = iter([
        {'temas': [{'number': 1, 'topic': 'A'}]},
        {'temas': [{'number': 2, 'topic': 'B'}]},
    ])
    monkeypatch.setattr(scanner, '_call_claude_vision', lambda *_: next(calls))

    assert scanner.extract_topics('file.pdf') == [
        {'number': 1, 'topic': 'A'},
        {'number': 2, 'topic': 'B'},
    ]


def test_extract_answer_key_aggregates_all_pages(monkeypatch):
    monkeypatch.setattr(
        ocr_service,
        'convert_from_path',
        lambda _: _fake_two_pages(),
    )

    scanner = ocr_service.ExamScanner()
    monkeypatch.setattr(scanner, '_encode_image', lambda _: 'b64')

    calls = iter([
        {'gabarito': [{'number': 1, 'correct_option': 'A'}]},
        {'gabarito': [{'number': 2, 'correct_option': None}]},
    ])
    monkeypatch.setattr(scanner, '_call_claude_vision', lambda *_: next(calls))

    assert scanner.extract_answer_key('file.pdf') == [
        {'number': 1, 'correct_option': 'A'},
        {'number': 2, 'correct_option': None},
    ]


def test_process_pdf_cleans_answers_and_skips_failed_pages(monkeypatch):
    monkeypatch.setattr(
        ocr_service,
        'convert_from_path',
        lambda _: _fake_two_pages(),
    )

    scanner = ocr_service.ExamScanner()
    monkeypatch.setattr(scanner, '_encode_image', lambda _: 'b64')

    calls = iter([
        {'student_name': 'Ana', 'answers': {4: 'a', '5': None, '6': 'c'}},
        None,
    ])
    monkeypatch.setattr(scanner, '_call_claude_vision', lambda *_: next(calls))

    assert scanner.process_pdf('alunos.pdf') == [
        {
            'page': 1,
            'student_name': 'Ana',
            'answers': {'4': 'A', '6': 'C'},
        }
    ]


def test_process_pdf_defaults_student_name_when_missing(monkeypatch):
    monkeypatch.setattr(
        ocr_service,
        'convert_from_path',
        lambda _: [_FakeImage()],
    )

    scanner = ocr_service.ExamScanner()
    monkeypatch.setattr(scanner, '_encode_image', lambda _: 'b64')
    monkeypatch.setattr(
        scanner,
        '_call_claude_vision',
        lambda *_: {'answers': {}},
    )

    result = scanner.process_pdf('alunos.pdf')[0]
    assert result['student_name'] == 'Aluno Não Identificado 1'
