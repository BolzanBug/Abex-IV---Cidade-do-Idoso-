package br.com.cidadedoidoso.api_idosos.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class LoginResponseDTO {

    private String mensagem;
    private String nome;
    private String email;
}
