package br.com.cidadedoidoso.api_idosos.service.impl;

import br.com.cidadedoidoso.api_idosos.banco_de_dados.entities.Idoso;
import br.com.cidadedoidoso.api_idosos.banco_de_dados.repositories.IdosoRepository;
import br.com.cidadedoidoso.api_idosos.dto.LoginRequestDTO;
import br.com.cidadedoidoso.api_idosos.dto.LoginResponseDTO;
import br.com.cidadedoidoso.api_idosos.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AuthServiceImpl implements AuthService {

    private final IdosoRepository idosoRepository;
    private final BCryptPasswordEncoder passwordEncoder;

    @Autowired
    public AuthServiceImpl(IdosoRepository idosoRepository) {
        this.idosoRepository = idosoRepository;
        this.passwordEncoder = new BCryptPasswordEncoder();
    }

    @Override
    public LoginResponseDTO autenticarIdoso(LoginRequestDTO dto) {
        // Aqui eu estou usando o "login" como email.
        // Se no seu front você estiver enviando CPF, é só trocar para findByCpf.
        Optional<Idoso> optionalIdoso = idosoRepository.findByEmail(dto.getLogin());

        if (optionalIdoso.isEmpty()) {
            throw new RuntimeException("Idoso não encontrado com esse email.");
        }

        Idoso idoso = optionalIdoso.get();

        if (!passwordEncoder.matches(dto.getSenha(), idoso.getSenha())) {
            throw new RuntimeException("Senha inválida.");
        }

        // Retorna só um tipo e um "nome exibido" (pode mudar depois)
        return new LoginResponseDTO("IDOSO", idoso.getNome());
    }

    @Override
    public LoginResponseDTO autenticarFuncionario(LoginRequestDTO dto) {
        // Para não quebrar o AuthController, deixo implementado assim.
        // Se você quiser login de funcionário de verdade, depois fazemos
        // com FuncionarioRepository.
        throw new UnsupportedOperationException("Login de funcionário ainda não foi implementado.");
    }
}
