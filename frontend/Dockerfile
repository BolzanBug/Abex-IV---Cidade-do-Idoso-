# Etapa 1: Use uma imagem base oficial e minúscula do Nginx.
# 'alpine' é uma versão do Linux muito pequena, ideal para contêineres.
FROM nginx:alpine

# Etapa 2: Copia todo o conteúdo da pasta atual (seus arquivos .html, .css, .js)
# para a pasta padrão do Nginx que serve conteúdo na web.
COPY . /usr/share/nginx/html

COPY nginx.conf /etc/nginx/conf.d/default.conf

# Etapa 3: Expõe a porta 80, que é a porta padrão para tráfego HTTP.
EXPOSE 80

# Não precisamos de um comando CMD, pois a imagem base do Nginx já sabe
# que deve iniciar o servidor Nginx quando o contêiner for executado.