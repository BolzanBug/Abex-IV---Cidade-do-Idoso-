/**
 * Bloqueia o toast fixo (canto superior direito). Último <script> da página.
 * pageshow: necessário quando o browser restaura a página do bfcache (voltar/navegar).
 */
(function () {
    function noop() {}

    function sweep() {
        document.querySelectorAll('.notification').forEach((el) => el.remove());
        const style = document.getElementById('notificationStyle');
        if (style) style.remove();
    }

    function lock() {
        window.showNotification = noop;
    }

    lock();
    sweep();

    function installObserver() {
        if (typeof MutationObserver === 'undefined') return;
        const obs = new MutationObserver((mutations) => {
            for (const m of mutations) {
                m.addedNodes.forEach((node) => {
                    if (node.nodeType !== 1) return;
                    if (node.classList && node.classList.contains('notification')) {
                        node.remove();
                        return;
                    }
                    if (node.querySelectorAll) {
                        node.querySelectorAll('.notification').forEach((n) => n.remove());
                    }
                });
            }
        });
        obs.observe(document.documentElement, { childList: true, subtree: true });
    }

    installObserver();

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function () {
            lock();
            sweep();
        });
    }
    window.addEventListener('load', function () {
        lock();
        sweep();
    });
    window.addEventListener('pageshow', function () {
        lock();
        sweep();
    });
})();
