"""atividades e inscricoes

Revision ID: a1b2c3d4e5f6
Revises: 32700616f070
Create Date: 2026-03-24

"""
from typing import Sequence, Union

import sqlalchemy as sa
from alembic import op

revision: str = 'a1b2c3d4e5f6'
down_revision: Union[str, Sequence[str], None] = '32700616f070'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.create_table(
        'activities',
        sa.Column('id', sa.Integer(), nullable=False),
        sa.Column('title', sa.String(length=200), nullable=False),
        sa.Column('time_label', sa.String(length=50), nullable=False),
        sa.Column('date_label', sa.String(length=120), nullable=False),
        sa.Column('image_url', sa.String(length=500), nullable=False),
        sa.PrimaryKeyConstraint('id', name=op.f('pk_activities')),
    )
    op.create_table(
        'activity_enrollments',
        sa.Column('id', sa.Integer(), nullable=False),
        sa.Column('user_id', sa.Integer(), nullable=False),
        sa.Column('activity_id', sa.Integer(), nullable=False),
        sa.Column('status', sa.String(length=20), nullable=False),
        sa.ForeignKeyConstraint(
            ['activity_id'],
            ['activities.id'],
            name=op.f('fk_activity_enrollments_activity_id_activities'),
        ),
        sa.ForeignKeyConstraint(
            ['user_id'],
            ['users.id'],
            name=op.f('fk_activity_enrollments_user_id_users'),
        ),
        sa.PrimaryKeyConstraint('id', name=op.f('pk_activity_enrollments')),
        sa.UniqueConstraint(
            'user_id',
            'activity_id',
            name='uq_activity_enrollments_user_activity',
        ),
    )

    activities = sa.table(
        'activities',
        sa.column('title', sa.String(length=200)),
        sa.column('time_label', sa.String(length=50)),
        sa.column('date_label', sa.String(length=120)),
        sa.column('image_url', sa.String(length=500)),
    )
    op.bulk_insert(
        activities,
        [
            {
                'title': 'Yoga Bloco A1',
                'time_label': '15:00h',
                'date_label': '24 de janeiro',
                'image_url': (
                    'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b'
                    '?w=300&h=200&fit=crop'
                ),
            },
            {
                'title': 'Computação Bloco X',
                'time_label': '09:00h',
                'date_label': 'Terças e quintas',
                'image_url': (
                    'https://images.unsplash.com/photo-1516321318423-f06f85e504b3'
                    '?w=300&h=200&fit=crop'
                ),
            },
            {
                'title': 'Natação Bloco X',
                'time_label': '10:30h',
                'date_label': 'Segundas e quartas',
                'image_url': (
                    'https://images.unsplash.com/photo-1530549387789-4c1017266635'
                    '?w=300&h=200&fit=crop'
                ),
            },
            {
                'title': 'Caminhada no Parque',
                'time_label': '07:00h',
                'date_label': 'Todos os dias',
                'image_url': (
                    'https://images.unsplash.com/photo-1476480862126-209bfaa8edc8'
                    '?w=300&h=200&fit=crop'
                ),
            },
            {
                'title': 'Música e convivência',
                'time_label': '14:00h',
                'date_label': 'Sextas-feiras',
                'image_url': (
                    'https://images.unsplash.com/photo-1511379938547-c1f69419868d'
                    '?w=300&h=200&fit=crop'
                ),
            },
        ],
    )


def downgrade() -> None:
    op.drop_table('activity_enrollments')
    op.drop_table('activities')
