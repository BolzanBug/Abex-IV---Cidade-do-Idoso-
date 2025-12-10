package br.com.cidadedoidoso.api_idosos.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class LoginRequestDTO {

    @NotBlank(message = "Login é obrigatório")
    private String login; // pode ser CPF ou usuário

    @NotBlank(message = "Senha é obrigatória")
    private String senha;
}
