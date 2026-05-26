FROM nginx:1.27-alpine

# A imagem base já traz index.html da página "Welcome to nginx"; removemos para não ficar por cima do portal.
RUN rm -rf /usr/share/nginx/html/*

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY . /usr/share/nginx/html

# Raiz do site = tela de login do Cidade do Idoso
RUN if [ -f /usr/share/nginx/html/login.html ]; then \
      cp /usr/share/nginx/html/login.html /usr/share/nginx/html/index.html; \
    fi

EXPOSE 80
