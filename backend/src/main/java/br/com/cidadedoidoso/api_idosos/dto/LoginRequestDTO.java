package br.com.cidadedoidoso.api_idosos.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class LoginRequestDTO {

    // Pode ser email OU CPF
    @NotBlank
    private String login;

    @NotBlank
    private String senha;
}
