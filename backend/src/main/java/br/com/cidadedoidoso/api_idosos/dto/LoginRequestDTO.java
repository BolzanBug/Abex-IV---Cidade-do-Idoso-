package br.com.cidadedoidoso.api_idosos.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class LoginRequestDTO {

    private String login; // pode ser email ou CPF
    private String senha;
}
