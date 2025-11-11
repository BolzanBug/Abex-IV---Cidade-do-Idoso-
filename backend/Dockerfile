# --- ESTÁGIO 1: O CONSTRUTOR ---
# Usamos uma imagem oficial do Maven que já vem com o JDK 17
FROM maven:3.9.6-eclipse-temurin-17 AS builder

# Define o diretório de trabalho dentro do contêiner "construtor"
WORKDIR /build

# 1. Copia o "mapa" do projeto primeiro
COPY pom.xml .

# 2. Baixa todas as dependências (isso fica em cache!)
RUN mvn dependency:go-offline

# 3. Agora copia o resto do código-fonte
COPY src ./src

# 4. Roda o comando para construir o .jar (pulando os testes para acelerar a build)
RUN mvn package -DskipTests

# --- ESTÁGIO 2: A IMAGEM FINAL ---
#
# AQUI ESTÁ A CORREÇÃO:
# Em vez de 'openjdk:17-slim', usamos 'eclipse-temurin:17-jre'.
# Esta é uma imagem leve, moderna e oficial que contém apenas o
# Java Runtime Environment (JRE), que é tudo o que precisamos para *rodar* o .jar.
#
FROM eclipse-temurin:17-jre

# Define o diretório de trabalho da aplicação
WORKDIR /app

# 5. Copia o .jar que foi gerado no ESTÁGIO 1 (o "builder")
# para dentro desta nova imagem final.
COPY --from=builder /build/target/*.jar app.jar

# Expõe a porta que a aplicação roda
EXPOSE 8080

# Comando para iniciar a aplicação
CMD ["java", "-jar", "app.jar"]