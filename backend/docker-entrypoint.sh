#!/bin/sh
set -e

echo "Aguardando PostgreSQL em ${DB_HOST:-db}..."
until pg_isready -h "${DB_HOST:-db}" -U "${POSTGRES_USER:-postgres}" -q; do
  sleep 1
done

echo "Executando migrations (Alembic)..."
cd /app
poetry run alembic upgrade head

echo "Iniciando API..."
exec poetry run uvicorn sistema_provas.app:app --host 0.0.0.0 --port 8000
