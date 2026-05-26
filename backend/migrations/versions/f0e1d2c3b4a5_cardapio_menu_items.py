"""cardapio menu_items

Revision ID: f0e1d2c3b4a5
Revises: a1b2c3d4e5f6
Create Date: 2026-03-24

"""
from typing import Sequence, Union

import sqlalchemy as sa
from alembic import op

revision: str = 'f0e1d2c3b4a5'
down_revision: Union[str, Sequence[str], None] = 'a1b2c3d4e5f6'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.create_table(
        'menu_items',
        sa.Column('id', sa.Integer(), nullable=False),
        sa.Column('dia_label', sa.String(length=60), nullable=False),
        sa.Column('ordem_dia', sa.Integer(), nullable=False),
        sa.Column('ordem_refeicao', sa.Integer(), nullable=False),
        sa.Column('refeicao', sa.String(length=40), nullable=False),
        sa.Column('titulo', sa.String(length=200), nullable=False),
        sa.Column('descricao', sa.String(length=600), nullable=False),
        sa.Column('imagem_url', sa.String(length=500), nullable=False),
        sa.PrimaryKeyConstraint('id', name=op.f('pk_menu_items')),
    )

    img = (
        'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=260&fit=crop'
    )
    img2 = (
        'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=400&h=260&fit=crop'
    )
    img3 = (
        'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&h=260&fit=crop'
    )

    rows = []
    dias = [
        (1, 'Segunda-feira'),
        (2, 'Terça-feira'),
        (3, 'Quarta-feira'),
        (4, 'Quinta-feira'),
        (5, 'Sexta-feira'),
        (6, 'Sábado'),
        (7, 'Domingo'),
    ]
    for od, nome in dias:
        rows.append(
            {
                'dia_label': nome,
                'ordem_dia': od,
                'ordem_refeicao': 1,
                'refeicao': 'Almoço',
                'titulo': f'Almoço — {nome.split("-")[0].strip()}',
                'descricao': (
                    'Arroz integral, feijão carioca, proteína magra grelhada, '
                    'salada de folhas e legumes cozidos no vapor. Sobremesa: '
                    'fruta da época. Opção sem sal à mesa.'
                ),
                'imagem_url': img if od % 2 == 1 else img2,
            }
        )
        rows.append(
            {
                'dia_label': nome,
                'ordem_dia': od,
                'ordem_refeicao': 2,
                'refeicao': 'Jantar',
                'titulo': f'Jantar leve — {nome.split("-")[0].strip()}',
                'descricao': (
                    'Sopa cremosa de legumes, pão integral, omelete ou peixe '
                    'assado, compota de frutas sem açúcar. Bebida: água ou chá '
                    'de ervas.'
                ),
                'imagem_url': img3 if od % 2 == 1 else img,
            }
        )

    t = sa.table(
        'menu_items',
        sa.column('dia_label', sa.String(60)),
        sa.column('ordem_dia', sa.Integer()),
        sa.column('ordem_refeicao', sa.Integer()),
        sa.column('refeicao', sa.String(40)),
        sa.column('titulo', sa.String(200)),
        sa.column('descricao', sa.String(600)),
        sa.column('imagem_url', sa.String(500)),
    )
    op.bulk_insert(t, rows)


def downgrade() -> None:
    op.drop_table('menu_items')
