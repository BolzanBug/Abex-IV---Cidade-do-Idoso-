"""news: sequencia em id no Postgres + seed se tabela vazia

Revision ID: i3k4l5m6n7o8
Revises: g1h2i3j4k5l6
Create Date: 2026-03-25

No PostgreSQL, id INTEGER PK sem DEFAULT fazia o bulk_insert inicial
da revisão g1h2 não gravar linhas (ou falhar). Esta revisão cria a
sequência, define DEFAULT e reinsere o seed se news estiver vazia.
"""
from typing import Sequence, Union

import sqlalchemy as sa
from alembic import op

revision: str = 'i3k4l5m6n7o8'
down_revision: Union[str, Sequence[str], None] = 'g1h2i3j4k5l6'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None

_SEED_ROWS = [
    {
        'titulo': 'Prefeitura de Chapecó — serviços e comunicados',
        'descricao': (
            'Portal oficial com notícias, editais, licitações e serviços ao cidadão '
            'da capital do Oeste catarinense.'
        ),
        'fonte': 'https://www.chapeco.sc.gov.br/',
    },
    {
        'titulo': 'G1 — Região de Chapecó',
        'descricao': (
            'Cobertura de Santa Catarina com foco no Oeste: política, economia, '
            'trânsito e cotidiano de Chapecó e cidades vizinhas.'
        ),
        'fonte': 'https://g1.globo.com/sc/santa-catarina/regiao-de-chapeco/',
    },
    {
        'titulo': 'Unochapecó — universidade e comunidade',
        'descricao': (
            'Notícias da Universidade Comunitária da Região de Chapecó: cursos, '
            'pesquisa, extensão e eventos abertos à cidade.'
        ),
        'fonte': 'https://www.unochapeco.edu.br/',
    },
    {
        'titulo': 'ACIOC — Associação Comercial e Industrial de Chapecó',
        'descricao': (
            'Agenda empresarial, desenvolvimento econômico e iniciativas que '
            'fortalecem o comércio e a indústria local.'
        ),
        'fonte': 'https://acioc.com.br/',
    },
    {
        'titulo': 'Oeste em foco — trânsito e mobilidade na região',
        'descricao': (
            'Acompanhe obras, alternativas de transporte e planejamento urbano '
            'que impactam o deslocamento em Chapecó e arredores.'
        ),
        'fonte': 'https://g1.globo.com/sc/santa-catarina/',
    },
    {
        'titulo': 'Diário do Oeste — notícias da região',
        'descricao': (
            'Jornal com cobertura de Chapecó e Oeste catarinense: política, '
            'esporte, cultura e segurança no dia a dia da cidade.'
        ),
        'fonte': 'https://odiariodoeste.com.br/',
    },
]


def upgrade() -> None:
    bind = op.get_bind()
    if bind.dialect.name != 'postgresql':
        return

    op.execute(sa.text('CREATE SEQUENCE IF NOT EXISTS news_id_seq'))
    op.execute(
        sa.text(
            "ALTER TABLE news ALTER COLUMN id SET DEFAULT nextval('news_id_seq')"
        )
    )
    op.execute(sa.text('ALTER SEQUENCE news_id_seq OWNED BY news.id'))

    cnt = bind.scalar(sa.text('SELECT COUNT(*) FROM news'))
    if cnt == 0:
        news_t = sa.table(
            'news',
            sa.column('titulo', sa.String(300)),
            sa.column('descricao', sa.String(2000)),
            sa.column('fonte', sa.String(800)),
        )
        op.bulk_insert(news_t, _SEED_ROWS)

    op.execute(
        sa.text(
            "SELECT setval('news_id_seq', GREATEST((SELECT COALESCE(MAX(id), 1) FROM news), 1))"
        )
    )


def downgrade() -> None:
    bind = op.get_bind()
    if bind.dialect.name != 'postgresql':
        return
    op.execute(sa.text('ALTER TABLE news ALTER COLUMN id DROP DEFAULT'))
    op.execute(sa.text('DROP SEQUENCE IF EXISTS news_id_seq'))
