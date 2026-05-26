document.addEventListener("DOMContentLoaded", () => {
    const registrationForm = document.getElementById("registrationForm");
    const firstNameInput = document.getElementById("firstName");
    const lastNameInput = document.getElementById("lastName");
    const emailInput = document.getElementById("email");
    const phoneInput = document.getElementById("phone");
    const birthDateInput = document.getElementById("birthDate");
    const genderInput = document.getElementById("gender");
    const passwordInput = document.getElementById("password");
    const confirmPasswordInput = document.getElementById("confirmPassword");
    const addressInput = document.getElementById("address");
    const cityInput = document.getElementById("city");
    const stateInput = document.getElementById("state");
    const zipCodeInput = document.getElementById("zipCode");

    const submitBtn = registrationForm.querySelector('button[type="submit"]');
    const originalBtnHTML = submitBtn.innerHTML;

    const formActions = document.querySelector(".form-actions");
    const feedbackElement = document.createElement("div");
    feedbackElement.id = "formFeedback";
    feedbackElement.style.textAlign = 'center';
    feedbackElement.style.padding = '12px';
    feedbackElement.style.borderRadius = '8px';
    feedbackElement.style.display = 'none';
    feedbackElement.style.marginTop = '-1rem';
    feedbackElement.style.marginBottom = '1.5rem';
    feedbackElement.style.fontSize = '0.95rem';
    feedbackElement.style.fontWeight = '500';
    feedbackElement.style.transition = 'all 0.3s ease';
    registrationForm.insertBefore(feedbackElement, formActions);

    const showFeedback = (message, isError) => {
        feedbackElement.textContent = message;
        feedbackElement.style.display = 'block';
        feedbackElement.style.color = isError ? '#c0392b' : '#2d5a3d';
        feedbackElement.style.background = isError ? '#fbe9e7' : '#eafaf1';
        feedbackElement.style.border = isError ? '1px solid #e74c3c' : '1px solid #27ae60';
    };

    const hideFeedback = () => {
        feedbackElement.textContent = '';
        feedbackElement.style.display = 'none';
    };

    const handleRegistration = async (e) => {
        e.preventDefault();
        hideFeedback();

        if (passwordInput.value !== confirmPasswordInput.value) {
            showFeedback("As senhas não coincidem.", true);
            return;
        }

        // Criando um username a partir do email (ex: joao@teste.com vira joao)
        // Isso é necessário porque o backend exige um 'username', mas o form não tem esse campo.
        const generatedUsername = emailInput.value.split('@')[0];

        const formData = {
            username: generatedUsername,
            email: emailInput.value,
            password: passwordInput.value,

            // Enviando os dados com os nomes exatos que o Pydantic espera
            first_name: firstNameInput.value,
            last_name: lastNameInput.value,
            phone: phoneInput.value,
            birth_date: birthDateInput.value || null, // Se vazio, manda null
            gender: genderInput.value,
            address: addressInput.value,
            city: cityInput.value,
            state: stateInput.value,
            zip_code: zipCodeInput.value
        };
        const base =
            typeof window.API_BASE_URL === 'string' && window.API_BASE_URL
                ? window.API_BASE_URL
                : 'http://localhost:8000';
        const backendUrl = `${base}/users/`;

        let skipResetButton = false;
        submitBtn.disabled = true;
        submitBtn.textContent = 'Cadastrando…';

        try {
            const response = await fetch(backendUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData), // FastAPI aceita JSON para rotas comuns de criação
            });

            if (response.ok) {
                showFeedback('Cadastro concluído. Abrindo o login…', false);
                registrationForm.reset();
                skipResetButton = true;
                submitBtn.disabled = true;
                setTimeout(() => window.location.assign('login.html'), 450);
            } else {
                const errorData = await response.json();
                console.error("Erro detalhado do backend:", errorData);

                let errorMessage = "Ocorreu um erro no cadastro. Verifique seus dados.";

                // Tratando a chave 'detail' do FastAPI
                if (errorData.detail) {
                    if (typeof errorData.detail === 'string') {
                        // Erro gerado manualmente no backend (ex: "Email already exists")
                        errorMessage = errorData.detail;
                    } else if (Array.isArray(errorData.detail)) {
                        // Erro de validação do Pydantic (Faltou algum campo ou formato errado)
                        errorMessage = "Erro de preenchimento: " + errorData.detail[0].msg;
                    }
                }

                showFeedback(errorMessage, true);
            }

        } catch (error) {
            console.error("Erro de rede:", error);
            showFeedback("Não foi possível conectar ao servidor. Verifique se o backend está rodando.", true);
        } finally {
            if (!skipResetButton) {
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalBtnHTML;
            }
        }
    };

    registrationForm.addEventListener("submit", handleRegistration);

    window.clearForm = () => {
        registrationForm.reset();
        hideFeedback();
    };
});