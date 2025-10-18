# Etapa 1: Use uma imagem base oficial do Java 17. A versão 'slim' é menor e otimizada.
FROM openjdk:17-slim

# Etapa 2: Define o diretório de trabalho dentro do contêiner.
# Todos os comandos a seguir serão executados a partir deste diretório.
WORKDIR /app

# Etapa 3: Copia o arquivo .jar da sua aplicação para dentro do contêiner.
# IMPORTANTE: Este comando assume que você já rodou "mvn package" e que o .jar está na pasta "target".
COPY target/*.jar app.jar

# Etapa 4: Expõe a porta que o Spring Boot usa por padrão.
# Isso é mais para documentação; o mapeamento real é feito no docker-compose.
EXPOSE 8080

# Etapa 5: O comando que será executado quando o contêiner iniciar.
# Ele simplesmente roda a aplicação Java.
CMD ["java", "-jar", "app.jar"]