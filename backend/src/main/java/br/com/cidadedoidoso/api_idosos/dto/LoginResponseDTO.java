package br.com.cidadedoidoso.api_idosos.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor // Cria um construtor com todos os argumentos
public class LoginResponseDTO {
    private String message;
    private String token;
}