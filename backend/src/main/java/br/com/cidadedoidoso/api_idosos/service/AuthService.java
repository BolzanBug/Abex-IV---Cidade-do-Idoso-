package br.com.cidadedoidoso.api_idosos.service;

import br.com.cidadedoidoso.api_idosos.dto.LoginRequestDTO;
import br.com.cidadedoidoso.api_idosos.dto.LoginResponseDTO;

public interface AuthService {

    LoginResponseDTO autenticarIdoso(LoginRequestDTO dto);

    LoginResponseDTO autenticarFuncionario(LoginRequestDTO dto);
}
