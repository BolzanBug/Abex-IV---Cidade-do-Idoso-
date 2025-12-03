Pra roda a aplicação:

1. fazer o git clone <url> da branch develop na maquina;


4. na pasta raiz e rodar o comando "docker-compose up --build" ou "docker compose up --build";

5. o frontend roda na porta 80 então é so acessar http://localhost/ no navegador. O backend roda na porta 8080 então é só acessar http://localhost/8080, como não tem nenhuma rota criada ele vai dar erro.
