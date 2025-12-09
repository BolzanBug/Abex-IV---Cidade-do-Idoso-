package br.com.cidadedoidoso.api_idosos.service;

import br.com.cidadedoidoso.api_idosos.banco_de_dados.entities.Idoso;
import br.com.cidadedoidoso.api_idosos.banco_de_dados.repositories.IdosoRepository;
import br.com.cidadedoidoso.api_idosos.dto.LoginRequestDTO;
import br.com.cidadedoidoso.api_idosos.dto.LoginResponseDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final IdosoRepository idosoRepository;
    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    public LoginResponseDTO login(LoginRequestDTO dto) {

        // Login pode ser email ou CPF
        Idoso idoso = idosoRepository
                .findByEmailOrCpf(dto.getLogin(), dto.getLogin())
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado."));

        if (!passwordEncoder.matches(dto.getSenha(), idoso.getSenha())) {
            throw new RuntimeException("Senha inválida.");
        }

        // Em um projeto real, aqui geraria um JWT.
        String tokenFake = "token_fake_apenas_para_exemplo";

        return new LoginResponseDTO(tokenFake, "Bearer");
    }
}
