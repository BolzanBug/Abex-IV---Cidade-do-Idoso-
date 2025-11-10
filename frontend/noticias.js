document.addEventListener("DOMContentLoaded", () => {
    const newsContainer = document.getElementById("newsContainer");
    const loadingSpinner = document.getElementById("loadingSpinner");
    const errorMessage = document.getElementById("errorMessage");

    const getDomain = (url) => {
        try {
            const domain = new URL(url).hostname;
            return domain.replace(/^www\./, '');
        } catch (_) {
            return url;
        }
    };

    const renderNews = (noticias) => {
        newsContainer.innerHTML = '';

        if (!noticias || noticias.length === 0) {
            newsContainer.innerHTML = '<p class="no-news">Nenhuma notícia encontrada no momento.</p>';
            return;
        }

        noticias.forEach(noticia => {
            const sourceDomain = getDomain(noticia.fonte);
            
            const article = document.createElement('article');
            article.className = 'news-item';
            
            article.innerHTML = `
                <h3 class="news-title">
                    <a href="${noticia.fonte}" target="_blank" rel="noopener noreferrer">${noticia.titulo}</a>
                </h3>
                <p class="news-description">${noticia.descricao}</p>
                <div class="news-footer">
                    <span class="news-source">Fonte: ${sourceDomain}</span>
                </div>
            `;
            
            newsContainer.appendChild(article);
        });
    };

    const fetchNews = async () => {
        loadingSpinner.classList.add("show");
        errorMessage.classList.remove("show");
        
        const backendUrl = "http://localhost:8080/noticias";

        try {
            const response = await fetch(backendUrl, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                const noticias = await response.json();
                renderNews(noticias);
            } else {
                const errorData = await response.json();
                errorMessage.textContent = errorData.message || "Falha ao carregar as notícias.";
                errorMessage.classList.add("show");
            }

        } catch (error) {
            errorMessage.textContent = "Não foi possível conectar ao servidor. Tente novamente mais tarde.";
            errorMessage.classList.add("show");
        
        } finally {
            loadingSpinner.classList.remove("show");
        }
    };

    fetchNews();
});