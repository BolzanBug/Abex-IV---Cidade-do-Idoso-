// --- FUNÇÕES GLOBAIS DE UTILIDADE E NAVEGAÇÃO ---

function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;

    if (!document.querySelector('#notificationStyle')) {
        const style = document.createElement('style');
        style.id = 'notificationStyle';
        style.textContent = `
            .notification {
                position: fixed; top: 20px; right: 20px; padding: 16px 24px;
                border-radius: 8px; color: white; font-weight: 500; z-index: 1001;
                animation: slideInRight 0.3s ease-out; max-width: 400px;
                box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
            }
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
        setTimeout(() => {
            if (notification.parentNode) notification.parentNode.removeChild(notification);
        }, 300);
    }, 4000);
}

function navigateToHome() {
    showNotification('Redirecionando para a Home...', 'info');
    setTimeout(() => { window.location.href = 'home.html'; }, 1000);
}

function navigateToActivities() {
    showNotification('Redirecionando para atividades...', 'info');
    setTimeout(() => { window.location.href = 'atividades.html'; }, 1000);
}

function navigateToMenu() {
    showNotification('Redirecionando para cardápio...', 'info');
    setTimeout(() => { console.log('Navigate to menu page'); }, 1000);
}

function navigateToNews() {
    showNotification('Você já está nas notícias...', 'info');
}

window.navigateToHome = navigateToHome;
window.navigateToActivities = navigateToActivities;
window.navigateToMenu = navigateToMenu;
window.navigateToNews = navigateToNews;


// --- LÓGICA DA PÁGINA DE LOGIN ---

document.addEventListener("DOMContentLoaded", () => {
    const idosoBtn = document.getElementById("idoso-btn");
    const funcionarioBtn = document.getElementById("funcionario-btn");
    const cpfUsuarioInput = document.getElementById("cpfUsuario");
    const submitBtn = document.getElementById("submit-btn");
    const loginForm = document.getElementById("login-form");
    const feedbackMessage = document.getElementById("feedback-message");

    let userType = "idoso"; // Estado inicial

    const updateUI = () => {
        if (userType === "idoso") {
            idosoBtn.classList.add("active");
            funcionarioBtn.classList.remove("active");
            cpfUsuarioInput.placeholder = "Digite seu E-mail"; // Ajustado visualmente para combinar com o backend
            submitBtn.textContent = "Entrar como Idoso";
        } else {
            idosoBtn.classList.remove("active");
            funcionarioBtn.classList.add("active");
            cpfUsuarioInput.placeholder = "Digite seu E-mail de funcionário";
            submitBtn.textContent = "Entrar como Funcionário";
        }
    };

    idosoBtn.addEventListener("click", () => { userType = "idoso"; updateUI(); });
    funcionarioBtn.addEventListener("click", () => { userType = "funcionario"; updateUI(); });

    const handleLogin = async (e) => {
        e.preventDefault();

        // Limpa mensagens anteriores
        feedbackMessage.textContent = "";
        feedbackMessage.className = "feedback-message";

        const cpfUsuario = cpfUsuarioInput.value;
        const senha = document.getElementById("senha").value;

        // Rota unificada do FastAPI
        const backendUrl = "http://localhost:8000/auth/token";

        // Prepara os dados no formato que o OAuth2 exige
        const formData = new URLSearchParams();
        formData.append("username", cpfUsuario); // Lembrando que no seu backend isso recebe o email
        formData.append("password", senha);

        try {
            const response = await fetch(backendUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: formData,
            });

            if (response.ok) {
                const data = await response.json();

                // Salva a "chave do cofre" no navegador
                if (data.access_token) {
                    localStorage.setItem("token", data.access_token);
                }

                feedbackMessage.textContent = "Login realizado com sucesso! Redirecionando...";
                feedbackMessage.classList.add("success");

                // Chama a função global que agora enxerga a notificação
                navigateToHome();

            } else {
                const errorData = await response.json();
                feedbackMessage.textContent = errorData.detail || "Usuário ou senha incorretos.";
                feedbackMessage.classList.add("error");

                // Exibe também como notificação de erro visual
                showNotification('Falha ao realizar login. Verifique seus dados.', 'error');
            }
        } catch (error) {
            feedbackMessage.textContent = "Não foi possível conectar ao servidor. Tente novamente mais tarde.";
            feedbackMessage.classList.add("error");
            showNotification('Erro de conexão com o servidor.', 'error');
        }
    };

    loginForm.addEventListener("submit", handleLogin);
    updateUI();
});