package br.com.cidadedoidoso.api_idosos.dto;

import lombok.Data;

// @Data do Lombok cria getters, setters, toString, etc. automaticamente.
@Data
public class LoginRequestDTO {
    private String login; // Corresponde ao "login: cpfUsuario" do seu JS
    private String senha; // Corresponde ao "senha: senha" do seu JS
}