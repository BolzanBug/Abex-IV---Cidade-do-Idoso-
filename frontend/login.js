document.addEventListener("DOMContentLoaded", () => {
    const idosoBtn = document.getElementById("idoso-btn");
    const funcionarioBtn = document.getElementById("funcionario-btn");
    const cpfUsuarioInput = document.getElementById("cpfUsuario");
    const submitBtn = document.getElementById("submit-btn");
    const loginForm = document.getElementById("login-form");
    const feedbackMessage = document.getElementById("feedback-message");

    let userType = "idoso"; // Estado inicial

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
    
        // Add t   o page
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

    function navigateToHome() {
    showNotification('Redirecionando para atividades...', 'info');
    
    setTimeout(() => {
        window.location.href = 'home.html';
    }, 1000);
}

    const updateUI = () => {
        if (userType === "idoso") {
            idosoBtn.classList.add("active");
            funcionarioBtn.classList.remove("active");
            cpfUsuarioInput.placeholder = "Digite seu CPF";
            submitBtn.textContent = "Entrar como Idoso";
        } else {
            idosoBtn.classList.remove("active");
            funcionarioBtn.classList.add("active");
            cpfUsuarioInput.placeholder = "Digite seu usuário de funcionário";
            submitBtn.textContent = "Entrar como Funcionário";
        }
    };

    idosoBtn.addEventListener("click", () => {
        userType = "idoso";
        updateUI();
    });

    funcionarioBtn.addEventListener("click", () => {
        userType = "funcionario";
        updateUI();
    });

    const handleLogin = async (e) => {
        e.preventDefault(); 
        feedbackMessage.textContent = ""; 
        feedbackMessage.className = "feedback-message";


        const cpfUsuario = cpfUsuarioInput.value;
        const senha = document.getElementById("senha").value;

        const backendUrl = `http://localhost:8080/login/${userType}`;

        console.log("Enviando dados para:", backendUrl);
        console.log("Payload:", { cpfUsuario, senha });

        try {
            const response = await fetch(backendUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    login: cpfUsuario,
                    senha: senha,
                }),
            });

            if (response.ok) {
                const data = await response.json();
                console.log("Login bem-sucedido:", data);

                feedbackMessage.textContent = "Login realizado com sucesso! Redirecionando...";
                feedbackMessage.classList.add("success");

                navigateToHome()

                // Aqui redireciona o usuario

            } else {
                const errorData = await response.json();
                console.error("Falha no login:", errorData);
                feedbackMessage.textContent = errorData.message || "CPF/Usuário ou senha incorretos.";
                feedbackMessage.classList.add("error");
            }
        } catch (error) {
            console.error("Erro na requisição:", error);
            feedbackMessage.textContent = "Não foi possível conectar ao servidor. Tente novamente mais tarde.";
            feedbackMessage.classList.add("error");
        }
    };

    loginForm.addEventListener("submit", handleLogin);

    updateUI(); 
});