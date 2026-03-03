from datetime import date, datetime
from typing import Optional

from sqlalchemy import JSON, ForeignKey, String, func, MetaData, UniqueConstraint
from sqlalchemy.orm import Mapped, mapped_column, registry, relationship

naming_convention = {
    "ix": "ix_%(column_0_label)s",
    "uq": "uq_%(table_name)s_%(column_0_name)s",
    "ck": "ck_%(table_name)s_%(constraint_name)s",
    "fk": "fk_%(table_name)s_%(column_0_name)s_%(referred_table_name)s",
    "pk": "pk_%(table_name)s"
}

metadata = MetaData(naming_convention=naming_convention)
table_registry = registry(metadata=metadata)


@table_registry.mapped_as_dataclass
class User:
    __tablename__ = 'users'

    id: Mapped[int] = mapped_column(init=False, primary_key=True)
    username: Mapped[str] = mapped_column(unique=True)
    password: Mapped[str]
    email: Mapped[str] = mapped_column(unique=True)

    # Novos campos adicionados
    first_name: Mapped[Optional[str]] = mapped_column(String(50), default=None)
    last_name: Mapped[Optional[str]] = mapped_column(String(50), default=None)
    phone: Mapped[Optional[str]] = mapped_column(String(20), default=None)
    birth_date: Mapped[Optional[date]] = mapped_column(default=None)
    gender: Mapped[Optional[str]] = mapped_column(String(20), default=None)
    address: Mapped[Optional[str]] = mapped_column(String(200), default=None)
    city: Mapped[Optional[str]] = mapped_column(String(100), default=None)
    state: Mapped[Optional[str]] = mapped_column(String(50), default=None)
    zip_code: Mapped[Optional[str]] = mapped_column(String(20), default=None)

    created_at: Mapped[datetime] = mapped_column(
        init=False, server_default=func.now()
    )
    updated_at: Mapped[datetime] = mapped_column(
        server_default=func.now(), onupdate=func.now(), init=False
    )
