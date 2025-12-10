package br.com.cidadedoidoso.api_idosos.service.impl;

import br.com.cidadedoidoso.api_idosos.banco_de_dados.entities.Idoso;
import br.com.cidadedoidoso.api_idosos.banco_de_dados.repositories.IdosoRepository;
import br.com.cidadedoidoso.api_idosos.dto.LoginRequestDTO;
import br.com.cidadedoidoso.api_idosos.dto.LoginResponseDTO;
import br.com.cidadedoidoso.api_idosos.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {

    private final IdosoRepository idosoRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public LoginResponseDTO autenticarIdoso(LoginRequestDTO dto) {

        Idoso idoso = idosoRepository.findByEmail(dto.getEmail())
                .orElseThrow(() -> new RuntimeException("Email ou senha inválidos"));

        boolean senhaCorreta = passwordEncoder.matches(dto.getSenha(), idoso.getSenha());
        if (!senhaCorreta) {
            throw new RuntimeException("Email ou senha inválidos");
        }

        return new LoginResponseDTO(
                "Login realizado com sucesso",
                idoso.getNome(),
                idoso.getEmail()
        );
    }
}
