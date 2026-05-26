document.addEventListener('DOMContentLoaded', async () => {
    const ctx = await requireStaff();
    if (!ctx) return;

    const fmtErr = window.staffFormatApiError;
    const withBusy = window.staffWithButtonBusy;

    const tbody = document.querySelector('#tabela-cardapio tbody');

    function clearTbody() {
        while (tbody.firstChild) tbody.removeChild(tbody.firstChild);
    }

    async function carregar() {
        const r = await fetch(`${API_BASE}/cardapio/`);
        if (!r.ok) {
            staffNotify('Erro ao carregar cardápio', 'error');
            return;
        }
        const { itens } = await r.json();
        clearTbody();

        if (!itens.length) {
            const tr = document.createElement('tr');
            const td = document.createElement('td');
            td.colSpan = 4;
            td.className = 'staff-empty';
            td.textContent = 'Nenhum item. Adicione acima.';
            tr.appendChild(td);
            tbody.appendChild(tr);
            return;
        }

        itens.forEach((item) => {
            const tr = document.createElement('tr');
            const td1 = document.createElement('td');
            td1.textContent = item.dia || '—';
            const td2 = document.createElement('td');
            td2.textContent = item.refeicao || '—';
            const td3 = document.createElement('td');
            td3.textContent = item.titulo || '—';
            const td4 = document.createElement('td');
            const wrap = document.createElement('div');
            wrap.className = 'staff-actions-cell';

            const bEdit = document.createElement('button');
            bEdit.type = 'button';
            bEdit.className = 'staff-btn staff-btn-secondary staff-btn-sm';
            bEdit.textContent = 'Editar';
            bEdit.addEventListener('click', () => editarItem(item));

            const bDel = document.createElement('button');
            bDel.type = 'button';
            bDel.className = 'staff-btn staff-btn-danger staff-btn-sm';
            bDel.textContent = 'Excluir';
            bDel.addEventListener('click', () => excluirItem(item.id));

            wrap.appendChild(bEdit);
            wrap.appendChild(bDel);
            td4.appendChild(wrap);
            tr.appendChild(td1);
            tr.appendChild(td2);
            tr.appendChild(td3);
            tr.appendChild(td4);
            tbody.appendChild(tr);
        });
    }

    async function excluirItem(id) {
        if (!confirm('Remover este item?')) return;
        const d = await fetch(`${API_BASE}/cardapio/itens/${id}`, {
            method: 'DELETE',
            headers: { Authorization: `Bearer ${ctx.token}` },
        });
        if (d.ok) {
            staffNotify('Item removido', 'success');
            carregar();
        } else {
            const err = await d.json().catch(() => ({}));
            staffNotify(fmtErr(err), 'error');
        }
    }

    async function editarItem(item) {
        const out = await staffFormModal({
            title: 'Editar item do cardápio',
            submitLabel: 'Salvar',
            fields: [
                { id: 'dia', label: 'Dia (rótulo)', value: item.dia, required: true },
                {
                    id: 'ordem_dia',
                    label: 'Ordem do dia',
                    type: 'number',
                    value: String(item.ordem_dia),
                    required: true,
                },
                {
                    id: 'ordem_refeicao',
                    label: 'Ordem da refeição',
                    type: 'number',
                    value: String(item.ordem_refeicao),
                    required: true,
                },
                { id: 'refeicao', label: 'Refeição', value: item.refeicao, required: true },
                { id: 'titulo', label: 'Título', value: item.titulo, required: true },
                { id: 'descricao', label: 'Descrição', type: 'textarea', value: item.descricao, rows: 4, required: true },
                { id: 'imagem_url', label: 'URL da imagem', type: 'url', value: item.imagem_url, required: true },
            ],
        });
        if (!out) return;
        const p = await fetch(`${API_BASE}/cardapio/itens/${item.id}`, {
            method: 'PUT',
            headers: staffAuthHeaders(),
            body: JSON.stringify({
                dia: out.dia,
                ordem_dia: Number(out.ordem_dia),
                ordem_refeicao: Number(out.ordem_refeicao),
                refeicao: out.refeicao,
                titulo: out.titulo,
                descricao: out.descricao,
                imagem_url: out.imagem_url,
            }),
        });
        if (p.ok) {
            staffNotify('Item atualizado', 'success');
            carregar();
        } else {
            const err = await p.json().catch(() => ({}));
            staffNotify(fmtErr(err), 'error');
        }
    }

    document.getElementById('form-item').addEventListener('submit', async (e) => {
        e.preventDefault();
        const btn = document.getElementById('btn-add-cardapio');
        await withBusy(btn, async () => {
            const body = {
                dia: document.getElementById('c-dia').value.trim(),
                ordem_dia: Number(document.getElementById('c-ordem-dia').value),
                ordem_refeicao: Number(document.getElementById('c-ordem-ref').value),
                refeicao: document.getElementById('c-refeicao').value.trim(),
                titulo: document.getElementById('c-titulo').value.trim(),
                descricao: document.getElementById('c-descricao').value.trim(),
                imagem_url: document.getElementById('c-img').value.trim(),
            };
            const r = await fetch(`${API_BASE}/cardapio/itens`, {
                method: 'POST',
                headers: staffAuthHeaders(),
                body: JSON.stringify(body),
            });
            if (r.ok) {
                staffNotify('Item adicionado', 'success');
                e.target.reset();
                document.getElementById('c-ordem-dia').value = '1';
                document.getElementById('c-ordem-ref').value = '1';
                carregar();
            } else {
                const err = await r.json().catch(() => ({}));
                staffNotify(fmtErr(err), 'error');
            }
        }, 'Salvando…');
    });

    carregar();
});
