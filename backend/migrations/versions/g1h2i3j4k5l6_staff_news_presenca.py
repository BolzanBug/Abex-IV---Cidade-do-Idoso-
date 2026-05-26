"""staff flag, news table, activity attendance

Revision ID: g1h2i3j4k5l6
Revises: f0e1d2c3b4a5
Create Date: 2026-03-24

Primeiro funcionário: após migrar, execute no banco:
  UPDATE users SET is_staff = 1 WHERE email = 'seu@email.com';

"""
from typing import Sequence, Union

import sqlalchemy as sa
from alembic import op

revision: str = 'g1h2i3j4k5l6'
down_revision: Union[str, Sequence[str], None] = 'f0e1d2c3b4a5'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.add_column(
        'users',
        sa.Column(
            'is_staff',
            sa.Boolean(),
            nullable=False,
            server_default=sa.false(),
        ),
    )
    op.create_table(
        'news',
        sa.Column('id', sa.Integer(), nullable=False),
        sa.Column('titulo', sa.String(length=300), nullable=False),
        sa.Column('descricao', sa.String(length=2000), nullable=False),
        sa.Column('fonte', sa.String(length=800), nullable=False),
        sa.Column(
            'created_at',
            sa.DateTime(),
            server_default=sa.text('(CURRENT_TIMESTAMP)'),
            nullable=False,
        ),
        sa.Column(
            'updated_at',
            sa.DateTime(),
            server_default=sa.text('(CURRENT_TIMESTAMP)'),
            nullable=False,
        ),
        sa.PrimaryKeyConstraint('id', name=op.f('pk_news')),
    )
    op.create_table(
        'activity_attendances',
        sa.Column('id', sa.Integer(), nullable=False),
        sa.Column('activity_id', sa.Integer(), nullable=False),
        sa.Column('user_id', sa.Integer(), nullable=False),
        sa.Column('attendance_date', sa.Date(), nullable=False),
        sa.Column('present', sa.Boolean(), nullable=False),
        sa.ForeignKeyConstraint(
            ['activity_id'],
            ['activities.id'],
            name=op.f('fk_activity_attendances_activity_id_activities'),
        ),
        sa.ForeignKeyConstraint(
            ['user_id'],
            ['users.id'],
            name=op.f('fk_activity_attendances_user_id_users'),
        ),
        sa.PrimaryKeyConstraint('id', name=op.f('pk_activity_attendances')),
        sa.UniqueConstraint(
            'activity_id',
            'user_id',
            'attendance_date',
            name='uq_activity_attendances_activity_user_date',
        ),
    )

    news_t = sa.table(
        'news',
        sa.column('titulo', sa.String(300)),
        sa.column('descricao', sa.String(2000)),
        sa.column('fonte', sa.String(800)),
    )
    op.bulk_insert(
        news_t,
        [
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
        ],
    )


def downgrade() -> None:
    op.drop_table('activity_attendances')
    op.drop_table('news')
    op.drop_column('users', 'is_staff')
