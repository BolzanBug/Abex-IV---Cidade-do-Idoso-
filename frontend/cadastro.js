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


    const loginBtn = registrationForm.querySelector('button[type="login"]');

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

        const formData = {
            nome: firstNameInput.value,
            sobrenome: lastNameInput.value,
            email: emailInput.value,
            telefone: phoneInput.value,
            dataNascimento: birthDateInput.value,
            genero: genderInput.value,
            senha: passwordInput.value,
            endereco: addressInput.value,
            cidade: cityInput.value,
            estado: stateInput.value,
            cep: zipCodeInput.value
        };

        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Cadastrando...';

        const backendUrl = "http://localhost:8080/usuarios/cadastro";

        try {
            const response = await fetch(backendUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                showFeedback("Cadastro realizado com sucesso!", false);
                registrationForm.reset();
                
            } else {
                const errorData = await response.json();
                showFeedback(errorData.message || "Ocorreu um erro no cadastro. Verifique seus dados.", true);
            }

        } catch (error) {
            showFeedback("Não foi possível conectar ao servidor. Tente novamente.", true);
        
        } finally {
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalBtnHTML;
        }
    };

    registrationForm.addEventListener("submit", handleRegistration);

    window.clearForm = () => {
        registrationForm.reset();
        hideFeedback();
    };
});