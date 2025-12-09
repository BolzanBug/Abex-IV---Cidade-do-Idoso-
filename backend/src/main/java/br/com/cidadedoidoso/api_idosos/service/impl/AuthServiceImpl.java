package br.com.cidadedoidoso.api_idosos.service.impl;

import br.com.cidadedoidoso.api_idosos.banco_de_dados.entities.Idoso;
import br.com.cidadedoidoso.api_idosos.banco_de_dados.repositories.IdosoRepository;
import br.com.cidadedoidoso.api_idosos.dto.LoginRequestDTO;
import br.com.cidadedoidoso.api_idosos.dto.LoginResponseDTO;
import br.com.cidadedoidoso.api_idosos.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {

    private final IdosoRepository idosoRepository;
    private final BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();

    @Override
    public LoginResponseDTO autenticarIdoso(LoginRequestDTO dto) {
        Idoso idoso = idosoRepository.findByEmail(dto.getLogin());

        if (idoso == null || !encoder.matches(dto.getSenha(), idoso.getSenha())) {
            return null;
        }

        return new LoginResponseDTO("OK", "Login realizado com sucesso");
    }

    @Override
    public LoginResponseDTO autenticarFuncionario(LoginRequestDTO dto) {
        // Se você quiser adicionar lógica futura
        return new LoginResponseDTO("OK", "Login de funcionário não implementado");
    }
}
