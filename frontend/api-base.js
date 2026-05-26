/**
 * Base URL da API para o frontend estático.
 * - Docker (nginx em 8080/80): prefixo /api (proxy no container).
 * - Dev local (Live Server, etc.): http://host:8000
 * Opcional: <meta name="api-base" content="https://...">
 */
(function () {
    function resolveApiBase() {
        const meta = document.querySelector('meta[name="api-base"]');
        if (meta && meta.content.trim()) {
            return meta.content.trim().replace(/\/$/, '');
        }
        const { hostname, port, protocol } = window.location;
        if (protocol === 'file:') {
            return 'http://localhost:8000';
        }
        const local = ['localhost', '127.0.0.1', '[::1]'].includes(hostname);
        if (local && (port === '8080' || port === '80' || port === '')) {
            return '/api';
        }
        if (local) {
            return `http://${hostname}:8000`;
        }
        return '/api';
    }

    window.API_BASE_URL = resolveApiBase();
})();
