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
    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    public AuthServiceImpl(IdosoRepository idosoRepository) {
        this.idosoRepository = idosoRepository;
    }

    @Override
    public LoginResponseDTO autenticarIdoso(LoginRequestDTO dto) {

        Idoso idoso = idosoRepository.findByEmail(dto.getLogin())
                .orElseThrow(() -> new RuntimeException("Idoso não encontrado"));

        if (!passwordEncoder.matches(dto.getSenha(), idoso.getSenha())) {
            throw new RuntimeException("Senha inválida");
        }

        return new LoginResponseDTO("OK", "Autenticado com sucesso");
    }

    @Override
    public LoginResponseDTO autenticarFuncionario(LoginRequestDTO dto) {
        // caso futuramente tenha tabela Funcionario, basta replicar aqui.
        throw new UnsupportedOperationException("Autenticação de funcionário ainda não implementada");
    }
}
