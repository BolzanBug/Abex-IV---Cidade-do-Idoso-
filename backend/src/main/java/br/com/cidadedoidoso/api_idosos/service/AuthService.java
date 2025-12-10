package br.com.cidadedoidoso.api_idosos.service;

import br.com.cidadedoidoso.api_idosos.dto.LoginRequestDTO;
import br.com.cidadedoidoso.api_idosos.dto.LoginResponseDTO;

public interface AuthService {

    LoginResponseDTO autenticarIdoso(LoginRequestDTO dto);

    // Deixa declarado para compilar o AuthController.
    // Podemos implementar depois de verdade, se você quiser login de funcionário.
    LoginResponseDTO autenticarFuncionario(LoginRequestDTO dto);
}
