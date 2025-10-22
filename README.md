Pra roda a aplicação:

1. fazer o git clone <url> da branch develop na maquina;

2. editar o arquivo application.properties no caminho backend -> src -> main -> reosurces. Adicionar o codido:
  spring.datasource.url=jdbc:postgresql://localhost:5432/idosos_db
  spring.datasource.username=postgres
  spring.datasource.password=############
  
  spring.jpa.hibernate.ddl-auto=update
  spring.jpa.show-sql=true
  spring.jpa.properties.hibernate.format_sql=true
  
  spring.jpa.database-platform=org.hibernate.dialect.PostgreSQLDialect

3. entrar na pasta backend e rodar o comando "mvn package";

4. voltar para a pasta raiz e rodar o comando "docker-compose up --build";

5. o frontend roda na porta 80 então é so acessar http://localhost/ no navegador. O backend roda na porta 8080 então é só acessar http://localhost/8080, como não tem nenhuma rota criada ele vai dar erro.
