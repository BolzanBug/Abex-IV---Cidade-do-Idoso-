// Home Page JavaScript

// Global variables
let currentSlide = 0;
const totalSlides = 3;
let autoSlideInterval;

// Initialize page
document.addEventListener('DOMContentLoaded', function() {
    initializeCarousel();
    setupEventListeners();
    initializeAccessibility();
});

// Carousel Functions
function initializeCarousel() {
    // Start auto-slide
    startAutoSlide();
    
    // Add click handlers to news items
    const newsItems = document.querySelectorAll('.news-item');
    newsItems.forEach(item => {
        item.addEventListener('click', function() {
            navigateToNews();
        });
    });
}

function startAutoSlide() {
    autoSlideInterval = setInterval(() => {
        nextSlide();
    }, 3000); // Change slide every 3 seconds
}

function stopAutoSlide() {
    clearInterval(autoSlideInterval);
}

function restartAutoSlide() {
    stopAutoSlide();
    startAutoSlide();
}

function showSlide(n) {
    const slides = document.querySelectorAll('.news-item');
    const dots = document.querySelectorAll('.dot');
    
    if (n >= totalSlides) currentSlide = 0;
    if (n < 0) currentSlide = totalSlides - 1;
    
    // Hide all slides
    slides.forEach(slide => {
        slide.classList.remove('active');
    });
    
    // Remove active class from all dots
    dots.forEach(dot => {
        dot.classList.remove('active');
    });
    
    // Show current slide and activate corresponding dot
    if (slides[currentSlide]) {
        slides[currentSlide].classList.add('active');
    }
    
    if (dots[currentSlide]) {
        dots[currentSlide].classList.add('active');
    }
}

function nextSlide() {
    currentSlide++;
    showSlide(currentSlide);
}

function prevSlide() {
    currentSlide--;
    showSlide(currentSlide);
    restartAutoSlide();
}

function currentSlideFunc(n) {
    currentSlide = n - 1;
    showSlide(currentSlide);
    restartAutoSlide();
}

// Make functions globally accessible
window.nextSlide = nextSlide;
window.prevSlide = prevSlide;
window.currentSlide = currentSlideFunc;


// Accessibility Functions
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

// Make accessibility function globally accessible
window.toggleVoiceAccessibility = toggleVoiceAccessibility;

// Event Listeners
function setupEventListeners() {
    // Pause auto-slide when user hovers over carousel
    const carousel = document.getElementById('newsCarousel');
    if (carousel) {
        carousel.addEventListener('mouseenter', stopAutoSlide);
        carousel.addEventListener('mouseleave', startAutoSlide);
    }
    
    // Handle navigation item clicks
    const navItems = document.querySelectorAll('.nav-item');
navItems.forEach(item => {
    item.addEventListener('click', function(e) {

    navItems.forEach(item => {
        item.addEventListener('click', function() {
        navItems.forEach(nav => nav.classList.remove('active'));
        this.classList.add('active');

    });
       }); 
        // Add cursor pointer
        card.style.cursor = 'pointer';
    });
    });
}

// Initialize accessibility features
function initializeAccessibility() {
    // Add keyboard navigation for carousel
    document.addEventListener('keydown', function(event) {
        if (event.key === 'ArrowLeft') {
            prevSlide();
        } else if (event.key === 'ArrowRight') {
            nextSlide();
        }
    });
    
    // Add ARIA labels to interactive elements
    const newsItems = document.querySelectorAll('.news-item');
    newsItems.forEach((item, index) => {
        item.setAttribute('tabindex', '0');
        item.setAttribute('role', 'button');
        item.setAttribute('aria-label', `Notícia ${index + 1}: ${item.querySelector('h3').textContent}`);
        
        // Add keyboard support
        item.addEventListener('keydown', function(event) {
            if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                navigateToNews();
            }
        });
    });
    
    // Add ARIA labels to navigation buttons
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
        const text = item.querySelector('span').textContent;
        item.setAttribute('aria-label', `Navegar para ${text}`);
    });
    
    // Add ARIA labels to carousel controls
    const prevBtn = document.querySelector('.carousel-btn.prev');
    const nextBtn = document.querySelector('.carousel-btn.next');
    
    if (prevBtn) prevBtn.setAttribute('aria-label', 'Notícia anterior');
    if (nextBtn) nextBtn.setAttribute('aria-label', 'Próxima notícia');
    
    // Add ARIA labels to dots
    const dots = document.querySelectorAll('.dot');
    dots.forEach((dot, index) => {
        dot.setAttribute('aria-label', `Ir para notícia ${index + 1}`);
        dot.setAttribute('tabindex', '0');
        
        dot.addEventListener('keydown', function(event) {
            if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                currentSlideFunc(index + 1);
            }
        });
    });
}

// Utility Functions
function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Add styles if not already present
    if (!document.querySelector('#notificationStyle')) {
        const style = document.createElement('style');
        style.id = 'notificationStyle';
        style.textContent = `
            .notification {
                position: fixed;
                top: 20px;
                right: 20px;
                padding: 16px 24px;
                border-radius: 8px;
                color: white;
                font-weight: 500;
                z-index: 1001;
                animation: slideInRight 0.3s ease-out;
                max-width: 400px;
                box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
            }
            
            .notification-success {
                background: #00B931;
            }
            
            .notification-error {
                background: #7A5C58;
            }
            
            .notification-warning {
                background: #f39c12;
            }
            
            .notification-info {
                background: #5C6672;
            }
            
            @keyframes slideInRight {
                from {
                    opacity: 0;
                    transform: translateX(100%);
                }
                to {
                    opacity: 1;
                    transform: translateX(0);
                }
            }
            
            @keyframes slideOutRight {
                from {
                    opacity: 1;
                    transform: translateX(0);
                }
                to {
                    opacity: 0;
                    transform: translateX(100%);
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    // Add to page
    document.body.appendChild(notification);
    
    // Auto remove after 4 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease-out';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 4000);
}

// Handle page visibility changes (pause carousel when tab is not active)
document.addEventListener('visibilitychange', function() {
    if (document.hidden) {
        stopAutoSlide();
    } else {
        startAutoSlide();
    }
});

// Handle window resize for responsive behavior
window.addEventListener('resize', function() {
    // Adjust carousel height on mobile
    const carousel = document.querySelector('.carousel');
    const newsItems = document.querySelectorAll('.news-item');
    
    if (window.innerWidth <= 768) {
        newsItems.forEach(item => {
            item.style.flexDirection = 'column';
        });
    } else {
        newsItems.forEach(item => {
            item.style.flexDirection = 'row';
        });
    }
});

// Service Worker registration (for future PWA features)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        // Service worker would be registered here for offline functionality
        console.log('Service Worker support detected');
    });
}

// Analytics tracking (placeholder for future implementation)
function trackEvent(category, action, label) {
    // Google Analytics or other tracking would go here
    console.log(`Event tracked: ${category} - ${action} - ${label}`);
}

// Track navigation clicks
document.addEventListener('click', function(event) {
    if (event.target.closest('.nav-item')) {
        const navText = event.target.closest('.nav-item').querySelector('span').textContent;
        trackEvent('Navigation', 'Click', navText);
    }
    
    if (event.target.closest('.news-item')) {
        trackEvent('News', 'Click', 'Carousel Item');
    }
    
    if (event.target.closest('.info-card')) {
        const cardTitle = event.target.closest('.info-card').querySelector('h3').textContent;
        trackEvent('Info Card', 'Click', cardTitle);
    }
});

// Get authentication token from localStorage
function getAuthToken() {
    return localStorage.getItem('authToken') || 'demo-token';
}

// Set authentication token
function setAuthToken(token) {
    localStorage.setItem('authToken', token);
}

// Remove authentication token
function removeAuthToken() {
    localStorage.removeItem('authToken');
}

// Logout function
async function logout() {
    try {
        // Show confirmation dialog
        const confirmLogout = confirm('Tem certeza de que deseja sair da sua conta?');
        
        if (!confirmLogout) {
            return;
        }
        
        showNotification('Fazendo logout...', 'info');
        
        // Send logout request to backend
        const response = await fetch(`http://localhost:8080/logout`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${getAuthToken()}`
            }
        });
        
        if (response.ok) {
            // Remove auth token
            removeAuthToken();
            
            // Show success message
            showNotification('Logout realizado com sucesso!', 'success');
            
            // Redirect to login page after delay
            setTimeout(() => {
                // In a real application, this would redirect to login page
                window.location.href = 'login.html';
            }, 2000);
            
        } else {
            throw new Error('Logout request failed');
        }
        
    } catch (error) {
        console.error('Logout error:', error);
        
        // Even if backend request fails, remove token locally
        removeAuthToken();
        showNotification('Logout realizado (modo offline)', 'warning');
        
        setTimeout(() => {
            window.location.href = 'login.html';
        }, 2000);
    }
}

//Get EndPoint Username and City
async function buscarDadosDoBackend() {
  try {
    const response = await fetch('http://127.0.0.1:8080/home/userinfo');
    if (!response.ok) {
      throw new Error(`Erro HTTP! status: ${response.status}`);
    }
    const data = await response.json();
    console.log(data.nome);
    console.log(data.cidade);
    document.getElementById("NomeUsario").innerHTML = data.nome;
    document.getElementById("CidadeUsuario").innerHTML = data.cidade;
    // Use os dados para atualizar sua interface, etc.
  } catch (error) {
    console.error('Falha ao buscar dados:', error);
  }

  //Get EndPoint News Carousel
   try {
    const response = await fetch('http://127.0.0.1:8080/home/news');
    if (!response.ok) {
      throw new Error(`Erro HTTP! status: ${response.status}`);
    }
    const data = await response.json();
    document.getElementById("TituloNoticia1").innerHTML = data.Titulo1;
    document.getElementById("Descricao1").innerHTML = data.Descricao1;
    document.getElementById("Classificacao1").innerHTML = data.Classificacao1;
      document.getElementById("TituloNoticia2").innerHTML = data.Titulo2;
    document.getElementById("Descricao2").innerHTML = data.Descricao2;
    document.getElementById("Classificacao2").innerHTML = data.Classificacao2;
      document.getElementById("TituloNoticia3").innerHTML = data.Titulo3;
    document.getElementById("Descricao3").innerHTML = data.Descricao3;
    document.getElementById("Classificacao3").innerHTML = data.Classificacao3;
    // Use os dados para atualizar sua interface, etc.
  } catch (error) {
    console.error('Falha ao buscar dados:', error);
  }
}
buscarDadosDoBackend();



