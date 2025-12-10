package br.com.cidadedoidoso.api_idosos.service.impl;

import br.com.cidadedoidoso.api_idosos.banco_de_dados.entities.Idoso;
import br.com.cidadedoidoso.api_idosos.banco_de_dados.repositories.IdosoRepository;
import br.com.cidadedoidoso.api_idosos.dto.LoginRequestDTO;
import br.com.cidadedoidoso.api_idosos.dto.LoginResponseDTO;
import br.com.cidadedoidoso.api_idosos.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthServiceImpl implements AuthService {

    @Autowired
    private IdosoRepository idosoRepository;

    private final BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();

    @Override
    public LoginResponseDTO autenticarIdoso(LoginRequestDTO dto) {

        Idoso idoso = idosoRepository.findByEmail(dto.getLogin())
                .orElse(null);

        if (idoso == null) {
            return new LoginResponseDTO("ERRO", "Usuário não encontrado.");
        }

        if (!encoder.matches(dto.getSenha(), idoso.getSenha())) {
            return new LoginResponseDTO("ERRO", "Senha incorreta.");
        }

        return new LoginResponseDTO("OK", "Login realizado com sucesso!");
    }

    @Override
    public LoginResponseDTO autenticarFuncionario(LoginRequestDTO dto) {

        // Se você tiver entidade Funcionario, ajuste aqui.
        // Por enquanto retorno fixo:

        return new LoginResponseDTO("ERRO", "Autenticação de funcionário não implementada.");
    }
}
