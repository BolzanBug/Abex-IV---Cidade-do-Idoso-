// Atividades Inscritas Page JavaScript

// DOM Elements
const cancelModal = document.getElementById('cancelModal');
const activitySelect = document.getElementById('activitySelect');

// Initialize page
document.addEventListener('DOMContentLoaded', function() {
    // Add event listeners
    setupEventListeners();
    
    // Initialize accessibility features
    initializeAccessibility();
    
    // Load user activities (simulated)
    loadUserActivities();
});

// Setup event listeners
function setupEventListeners() {
    // Close modal when clicking outside
    window.addEventListener('click', function(event) {
        if (event.target === cancelModal) {
            closeCancelModal();
        }
    });
    
    // Keyboard navigation for modal
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape' && cancelModal.style.display === 'block') {
            closeCancelModal();
        }
    });
    
    // Activity card interactions
    const activityCards = document.querySelectorAll('.activity-card');
    activityCards.forEach(card => {
        card.addEventListener('click', function() {
            selectActivityCard(this);
        });
    });
}

// Cancel Activity Modal Functions
function cancelActivity() {
    // Check if there are any confirmed activities to cancel
    const confirmedActivities = document.querySelectorAll('.activity-card.confirmed');
    
    if (confirmedActivities.length === 0) {
        showNotification('Não há atividades confirmadas para cancelar.', 'info');
        return;
    }
    
    // Update activity select options
    updateActivitySelectOptions();
    
    // Show modal
    cancelModal.style.display = 'block';
    document.body.style.overflow = 'hidden';
    
    // Focus on select element
    setTimeout(() => {
        activitySelect.focus();
    }, 100);
}

function closeCancelModal() {
    cancelModal.style.display = 'none';
    document.body.style.overflow = 'auto';
    
    // Reset form
    activitySelect.value = '';
}

function confirmCancel() {
    const selectedActivity = activitySelect.value;
    
    if (!selectedActivity) {
        showNotification('Por favor, selecione uma atividade para cancelar.', 'warning');
        return;
    }
    
    // Show loading state
    const confirmButton = document.querySelector('.modal-footer .btn-cancel');
    setLoadingState(confirmButton, true);
    
    // Simulate API call
    setTimeout(() => {
        // Find and update the activity card
        const activityCard = findActivityCard(selectedActivity);
        if (activityCard) {
            updateActivityStatus(activityCard, 'canceled');
            updateActivitySummary();
            showNotification('Atividade cancelada com sucesso!', 'success');
        }
        
        setLoadingState(confirmButton, false);
        closeCancelModal();
    }, 1500);
}

// Update activity select options based on confirmed activities
function updateActivitySelectOptions() {
    const confirmedActivities = document.querySelectorAll('.activity-card.confirmed');
    
    // Clear existing options except the first one
    activitySelect.innerHTML = '<option value="">Escolha uma atividade...</option>';
    
    confirmedActivities.forEach(card => {
        const title = card.querySelector('.activity-title').textContent;
        const value = title.toLowerCase().replace(/\s+/g, '-');
        
        const option = document.createElement('option');
        option.value = value;
        option.textContent = title;
        activitySelect.appendChild(option);
    });
}

// Find activity card by identifier
function findActivityCard(identifier) {
    const cards = document.querySelectorAll('.activity-card');
    
    for (let card of cards) {
        const title = card.querySelector('.activity-title').textContent;
        const cardId = title.toLowerCase().replace(/\s+/g, '-');
        
        if (cardId === identifier) {
            return card;
        }
    }
    
    return null;
}

// Update activity status
function updateActivityStatus(card, status) {
    const statusElement = card.querySelector('.card-status');
    const statusIcon = statusElement.querySelector('i');
    const statusText = statusElement.querySelector('span');
    
    // Remove existing status classes
    card.classList.remove('confirmed', 'canceled');
    
    if (status === 'canceled') {
        card.classList.add('canceled');
        statusIcon.className = 'fas fa-times';
        statusText.textContent = 'CANCELADO';
    } else if (status === 'confirmed') {
        card.classList.add('confirmed');
        statusIcon.className = 'fas fa-check';
        statusText.textContent = 'CONFIRMADO';
    }
    
    // Add animation effect
    card.style.transform = 'scale(0.95)';
    setTimeout(() => {
        card.style.transform = 'scale(1)';
    }, 200);
}

// Update activity summary
function updateActivitySummary() {
    const confirmedActivities = document.querySelectorAll('.activity-card.confirmed');
    const summaryText = document.querySelector('.summary-text p');
    const count = confirmedActivities.length;
    
    summaryText.innerHTML = `Você está inscrito(a) em <strong>${count} ${count === 1 ? 'atividade' : 'atividades'}</strong>`;
}

// Select activity card (visual feedback)
function selectActivityCard(card) {
    // Remove selection from other cards
    document.querySelectorAll('.activity-card').forEach(c => {
        c.classList.remove('selected');
    });
    
    // Add selection to clicked card
    card.classList.add('selected');
    
    // Add CSS for selected state if not already present
    if (!document.querySelector('#selectedCardStyle')) {
        const style = document.createElement('style');
        style.id = 'selectedCardStyle';
        style.textContent = `
            .activity-card.selected {
                border-color: #00B931;
                box-shadow: 0 0 0 3px rgba(0, 185, 49, 0.2);
            }
        `;
        document.head.appendChild(style);
    }
}

// View all activities
function viewAllActivities() {
    showNotification('Redirecionando para todas as atividades...', 'info');
    
    // Simulate navigation
    setTimeout(() => {
        // In a real application, this would navigate to another page
        console.log('Navigate to all activities page');
    }, 1000);
}

// Voice accessibility toggle
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

// Initialize accessibility features
function initializeAccessibility() {
    // Add keyboard navigation for activity cards
    const activityCards = document.querySelectorAll('.activity-card');
    
    activityCards.forEach((card, index) => {
        card.setAttribute('tabindex', '0');
        card.setAttribute('role', 'button');
        card.setAttribute('aria-label', `Atividade ${card.querySelector('.activity-title').textContent}`);
        
        card.addEventListener('keydown', function(event) {
            if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                selectActivityCard(this);
            }
        });
    });
    
    // Add ARIA labels to buttons
    const buttons = document.querySelectorAll('button');
    buttons.forEach(button => {
        if (!button.getAttribute('aria-label')) {
            const text = button.textContent.trim();
            if (text) {
                button.setAttribute('aria-label', text);
            }
        }
    });
}

// Load user activities (simulated)
function loadUserActivities() {
    // This would typically fetch data from an API
    // For now, we'll just add some interactive behavior
    
    const activityCards = document.querySelectorAll('.activity-card');
    
    activityCards.forEach((card, index) => {
        // Add staggered animation
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            card.style.transition = 'all 0.5s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 200);
    });
}

// Utility Functions
function setLoadingState(button, isLoading) {
    if (isLoading) {
        button.classList.add('loading');
        button.disabled = true;
    } else {
        button.classList.remove('loading');
        button.disabled = false;
    }
}

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


