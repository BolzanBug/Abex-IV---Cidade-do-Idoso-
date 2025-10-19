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