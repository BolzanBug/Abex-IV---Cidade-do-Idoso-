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

        // 🌟 Agora o login é feito usando CPF
        Idoso idoso = idosoRepository.findByCpf(dto.getLogin())
                .orElseThrow(() -> new RuntimeException("CPF ou senha inválidos"));

        // Verifica senha
        boolean senhaCorreta = passwordEncoder.matches(dto.getSenha(), idoso.getSenha());
        if (!senhaCorreta) {
            throw new RuntimeException("CPF ou senha inválidos");
        }

        // Retorno correto para o frontend
        return new LoginResponseDTO(
                "Login realizado com sucesso",
                idoso.getNome(),
                idoso.getEmail()
        );
    }
}
