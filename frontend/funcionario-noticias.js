document.addEventListener('DOMContentLoaded', async () => {
    const ctx = await requireStaff();
    if (!ctx) return;

    const fmtErr = window.staffFormatApiError;
    const withBusy = window.staffWithButtonBusy;

    const tbody = document.querySelector('#tabela-noticias tbody');

    function clearTbody() {
        while (tbody.firstChild) tbody.removeChild(tbody.firstChild);
    }

    async function carregar() {
        const r = await fetch(`${API_BASE}/noticias`);
        if (!r.ok) {
            staffNotify('Erro ao carregar notícias', 'error');
            return;
        }
        const list = await r.json();
        clearTbody();

        if (!list.length) {
            const tr = document.createElement('tr');
            const td = document.createElement('td');
            td.colSpan = 3;
            td.className = 'staff-empty';
            td.textContent = 'Nenhuma notícia cadastrada.';
            tr.appendChild(td);
            tbody.appendChild(tr);
            return;
        }

        list.forEach((n) => {
            const tr = document.createElement('tr');
            const td1 = document.createElement('td');
            td1.textContent = n.titulo || '—';

            const td2 = document.createElement('td');
            const link = document.createElement('a');
            link.href = n.fonte || '#';
            link.target = '_blank';
            link.rel = 'noopener noreferrer';
            link.textContent = 'Abrir fonte';
            link.title = n.fonte || '';
            td2.appendChild(link);

            const td3 = document.createElement('td');
            const wrap = document.createElement('div');
            wrap.className = 'staff-actions-cell';

            const bEdit = document.createElement('button');
            bEdit.type = 'button';
            bEdit.className = 'staff-btn staff-btn-secondary staff-btn-sm';
            bEdit.textContent = 'Editar';
            bEdit.addEventListener('click', () => editarNoticia(n));

            const bDel = document.createElement('button');
            bDel.type = 'button';
            bDel.className = 'staff-btn staff-btn-danger staff-btn-sm';
            bDel.textContent = 'Excluir';
            bDel.addEventListener('click', () => excluirNoticia(n.id));

            wrap.appendChild(bEdit);
            wrap.appendChild(bDel);
            td3.appendChild(wrap);
            tr.appendChild(td1);
            tr.appendChild(td2);
            tr.appendChild(td3);
            tbody.appendChild(tr);
        });
    }

    async function excluirNoticia(id) {
        if (!confirm('Remover esta notícia?')) return;
        const d = await fetch(`${API_BASE}/noticias/${id}`, {
            method: 'DELETE',
            headers: { Authorization: `Bearer ${ctx.token}` },
        });
        if (d.ok) {
            staffNotify('Removida', 'success');
            carregar();
        } else {
            const err = await d.json().catch(() => ({}));
            staffNotify(fmtErr(err), 'error');
        }
    }

    async function editarNoticia(item) {
        const out = await staffFormModal({
            title: 'Editar notícia',
            submitLabel: 'Salvar',
            fields: [
                { id: 'titulo', label: 'Título', value: item.titulo, required: true },
                { id: 'descricao', label: 'Descrição', type: 'textarea', value: item.descricao, rows: 5, required: true },
                { id: 'fonte', label: 'URL', type: 'url', value: item.fonte, required: true },
            ],
        });
        if (!out) return;
        const p = await fetch(`${API_BASE}/noticias/${item.id}`, {
            method: 'PATCH',
            headers: staffAuthHeaders(),
            body: JSON.stringify({ titulo: out.titulo, descricao: out.descricao, fonte: out.fonte }),
        });
        if (p.ok) {
            staffNotify('Atualizada', 'success');
            carregar();
        } else {
            const err = await p.json().catch(() => ({}));
            staffNotify(fmtErr(err), 'error');
        }
    }

    document.getElementById('form-noticia').addEventListener('submit', async (e) => {
        e.preventDefault();
        const btn = document.getElementById('btn-publicar-noticia');
        await withBusy(btn, async () => {
            const body = {
                titulo: document.getElementById('n-titulo').value.trim(),
                descricao: document.getElementById('n-descricao').value.trim(),
                fonte: document.getElementById('n-fonte').value.trim(),
            };
            const r = await fetch(`${API_BASE}/noticias`, {
                method: 'POST',
                headers: staffAuthHeaders(),
                body: JSON.stringify(body),
            });
            if (r.ok) {
                staffNotify('Notícia criada', 'success');
                e.target.reset();
                carregar();
            } else {
                const err = await r.json().catch(() => ({}));
                staffNotify(fmtErr(err), 'error');
            }
        }, 'Publicando…');
    });

    carregar();
});
