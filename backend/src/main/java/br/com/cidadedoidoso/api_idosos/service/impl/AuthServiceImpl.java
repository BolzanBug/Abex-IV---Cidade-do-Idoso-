package br.com.cidadedoidoso.api_idosos.service.impl;

import br.com.cidadedoidoso.api_idosos.banco_de_dados.entities.Idoso;
import br.com.cidadedoidoso.api_idosos.banco_de_dados.repositories.IdosoRepository;
import br.com.cidadedoidoso.api_idosos.dto.LoginRequestDTO;
import br.com.cidadedoidoso.api_idosos.dto.LoginResponseDTO;
import br.com.cidadedoidoso.api_idosos.service.AuthService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthServiceImpl implements AuthService {

    private final IdosoRepository idosoRepository;
    private final BCryptPasswordEncoder passwordEncoder;

    public AuthServiceImpl(IdosoRepository idosoRepository, BCryptPasswordEncoder passwordEncoder) {
        this.idosoRepository = idosoRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public LoginResponseDTO autenticarIdoso(LoginRequestDTO dto) {

        // login pode ser email OU cpf
        Idoso idoso = idosoRepository
                .findByEmailOrCpf(dto.getLogin(), dto.getLogin())
                .orElseThrow(() -> new RuntimeException("Usuário ou senha inválidos"));

        if (!passwordEncoder.matches(dto.getSenha(), idoso.getSenha())) {
            throw new RuntimeException("Usuário ou senha inválidos");
        }

        return new LoginResponseDTO(
                "Login realizado com sucesso",
                idoso.getNome()
        );
    }
}
