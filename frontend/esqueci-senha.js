const form = document.getElementById("resetForm");
const emailInput = document.getElementById("email");
const submitBtn = document.getElementById("submitBtn");
const errorMessage = document.getElementById("errorMessage");
const successMessage = document.getElementById("successMessage");

// Validação de e-mail
function isValidEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

// Remover erro ao digitar
emailInput.addEventListener("input", function() {
    if (this.classList.contains("error")) {
        this.classList.remove("error");
        errorMessage.classList.remove("show");
    }
});

// Submeter formulário
form.addEventListener("submit", function(e) {
    e.preventDefault();
    
    const email = emailInput.value.trim();

    // Validar e-mail
    if (!isValidEmail(email)) {
        emailInput.classList.add("error");
        errorMessage.classList.add("show");
        emailInput.focus();
        return;
    }

    // Remover mensagem de erro
    emailInput.classList.remove("error");
    errorMessage.classList.remove("show");

    // Mostrar loading
    submitBtn.classList.add("loading");
    submitBtn.disabled = true;

    // Simular envio de e-mail (2 segundos)
    setTimeout(function() {
        // Remover loading
        submitBtn.classList.remove("loading");
        submitBtn.disabled = false;

        // Esconder formulário e mostrar mensagem de sucesso
        form.style.display = "none";
        successMessage.classList.add("show");

        // Opcional: resetar após 5 segundos
        setTimeout(function() {
            form.style.display = "block";
            successMessage.classList.remove("show");
            form.reset();
        }, 5000);
    }, 2000);
});
