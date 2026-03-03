// Global variables
let currentSlide = 0;
const totalSlides = 3;
let autoSlideInterval;

// Initialize page
document.addEventListener('DOMContentLoaded', async function() {
    // 1. O Leão de Chácara: Verifica autenticação antes de renderizar
    const isAuthenticated = await checkAuthentication();

    // Se não estiver autenticado, a função acima já redireciona.
    // Só inicializa a página se passar no teste.
    if (isAuthenticated) {
        initializeCarousel();
        setupEventListeners();
        initializeAccessibility();
    }
});

// --- LÓGICA DE AUTENTICAÇÃO ---

async function checkAuthentication() {
    const token = localStorage.getItem("token");

    if (!token) {
        console.warn("Nenhum token encontrado. Redirecionando para login.");
        window.location.href = "login.html";
        return false;
    }

    try {
        const response = await fetch("http://localhost:8000/users/me", {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });

        if (response.ok) {
            const userData = await response.json();

            // Atualiza a interface com os dados do usuário
            const greetingElement = document.getElementById("user-greeting");
            const welcomeTitle = document.getElementById("welcome-title");

            // Prioriza o primeiro nome, se não tiver, usa o username
            const nomeExibicao = userData.first_name || userData.username;

            if (greetingElement) {
                greetingElement.textContent = `Olá, ${nomeExibicao}`;
                greetingElement.style.display = 'block';
            }
            if (welcomeTitle) {
                welcomeTitle.textContent = `Bem-vindo(a), ${nomeExibicao}!`;
            }

            return true;
        } else {
            // Token existe mas é inválido/expirado
            console.warn("Sessão inválida. Redirecionando para login.");
            localStorage.removeItem("token");
            window.location.href = "login.html";
            return false;
        }
    } catch (error) {
        console.error("Erro ao validar token com o servidor:", error);
        showNotification("Erro de conexão. Alguns recursos podem não carregar.", "error");
        return true; // Permite o carregamento em caso de erro de rede, você pode alterar para false se for uma rota super restrita
    }
}

function logout() {
    localStorage.removeItem("token");
    window.location.href = "login.html";
}

// Tornando o logout global para o botão HTML
window.logout = logout;


// --- LÓGICA DO CARROSSEL E NAVEGAÇÃO (Mantida) ---

function initializeCarousel() {
    startAutoSlide();
    const newsItems = document.querySelectorAll('.news-item');
    newsItems.forEach(item => {
        item.addEventListener('click', function() { navigateToNews(); });
    });
}

function startAutoSlide() {
    autoSlideInterval = setInterval(() => { nextSlide(); }, 3000);
}

function stopAutoSlide() { clearInterval(autoSlideInterval); }

function restartAutoSlide() {
    stopAutoSlide();
    startAutoSlide();
}

function showSlide(n) {
    const slides = document.querySelectorAll('.news-item');
    const dots = document.querySelectorAll('.dot');

    if (n >= totalSlides) currentSlide = 0;
    if (n < 0) currentSlide = totalSlides - 1;

    slides.forEach(slide => slide.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));

    if (slides[currentSlide]) slides[currentSlide].classList.add('active');
    if (dots[currentSlide]) dots[currentSlide].classList.add('active');
}

function nextSlide() { currentSlide++; showSlide(currentSlide); }
function prevSlide() { currentSlide--; showSlide(currentSlide); restartAutoSlide(); }
function currentSlideFunc(n) { currentSlide = n - 1; showSlide(currentSlide); restartAutoSlide(); }

window.nextSlide = nextSlide;
window.prevSlide = prevSlide;
window.currentSlide = currentSlideFunc;

// --- FUNÇÕES DE NAVEGAÇÃO ---

function navigateToHome() { showNotification('Você já está na página inicial!', 'info'); }

function navigateToActivities() {
    showNotification('Redirecionando para atividades...', 'info');
    setTimeout(() => { window.location.href = 'atividades.html'; }, 1000);
}

function navigateToMenu() {
    showNotification('Redirecionando para cardápio...', 'info');
    setTimeout(() => { console.log('Navigate to menu page'); }, 1000);
}

function navigateToNews() {
    showNotification('Redirecionando para notícias...', 'info');
    setTimeout(() => { window.location.href = 'noticias.html'; }, 1000);
}

window.navigateToHome = navigateToHome;
window.navigateToActivities = navigateToActivities;
window.navigateToMenu = navigateToMenu;
window.navigateToNews = navigateToNews;

// --- FUNÇÕES DE ACESSIBILIDADE E UTILITÁRIOS ---

function toggleVoiceAccessibility() {
    const button = document.querySelector('.accessibility-btn');
    const isActive = button.classList.contains('active');

    if (isActive) {
        button.classList.remove('active');
        button.innerHTML = '<i class="fas fa-volume-up"></i><span>Ativar acessibilidade por voz</span>';
        showNotification('Acessibilidade por voz desativada', 'info');
    } else {
        button.classList.add('active');
        button.innerHTML = '<i class="fas fa-volume-off"></i><span>Desativar acessibilidade por voz</span>';
        showNotification('Acessibilidade por voz ativada', 'success');
    }
}
window.toggleVoiceAccessibility = toggleVoiceAccessibility;

function setupEventListeners() {
    const carousel = document.getElementById('newsCarousel');
    if (carousel) {
        carousel.addEventListener('mouseenter', stopAutoSlide);
        carousel.addEventListener('mouseleave', startAutoSlide);
    }

    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            navItems.forEach(nav => nav.classList.remove('active'));
            this.classList.add('active');
        });
    });

    const infoCards = document.querySelectorAll('.info-card');
    infoCards.forEach((card, index) => {
        card.addEventListener('click', function() {
            switch(index) {
                case 0: navigateToActivities(); break;
                case 1: navigateToMenu(); break;
                case 2: navigateToNews(); break;
            }
        });
        card.style.cursor = 'pointer';
    });
}

function initializeAccessibility() {
    document.addEventListener('keydown', function(event) {
        if (event.key === 'ArrowLeft') prevSlide();
        else if (event.key === 'ArrowRight') nextSlide();
    });

    const newsItems = document.querySelectorAll('.news-item');
    newsItems.forEach((item, index) => {
        item.setAttribute('tabindex', '0');
        item.setAttribute('role', 'button');
        item.setAttribute('aria-label', `Notícia ${index + 1}: ${item.querySelector('h3').textContent}`);
        item.addEventListener('keydown', function(event) {
            if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                navigateToNews();
            }
        });
    });
}

function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;

    if (!document.querySelector('#notificationStyle')) {
        const style = document.createElement('style');
        style.id = 'notificationStyle';
        style.textContent = `
            .notification { position: fixed; top: 20px; right: 20px; padding: 16px 24px; border-radius: 8px; color: white; font-weight: 500; z-index: 1001; animation: slideInRight 0.3s ease-out; max-width: 400px; box-shadow: 0 4px 20px rgba(0,0,0,0.2); }
            .notification-success { background: #00B931; }
            .notification-error { background: #7A5C58; }
            .notification-warning { background: #f39c12; }
            .notification-info { background: #5C6672; }
            @keyframes slideInRight { from { opacity: 0; transform: translateX(100%); } to { opacity: 1; transform: translateX(0); } }
            @keyframes slideOutRight { from { opacity: 1; transform: translateX(0); } to { opacity: 0; transform: translateX(100%); } }
        `;
        document.head.appendChild(style);
    }

    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease-out';
        setTimeout(() => { if (notification.parentNode) notification.parentNode.removeChild(notification); }, 300);
    }, 4000);
}

document.addEventListener('visibilitychange', function() {
    if (document.hidden) stopAutoSlide();
    else startAutoSlide();
});