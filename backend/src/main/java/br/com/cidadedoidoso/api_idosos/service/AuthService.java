package br.com.cidadedoidoso.api_idosos.service;

import br.com.cidadedoidoso.api_idosos.dto.LoginRequestDTO;
import br.com.cidadedoidoso.api_idosos.dto.LoginResponseDTO;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    public LoginResponseDTO autenticarIdoso(LoginRequestDTO dto) {
        // --- LÓGICA DE AUTENTICAÇÃO SIMPLIFICADA (FAKE) ---
        // Em um projeto real, aqui você faria:
        // 1. Buscar no banco de dados um Idoso pelo CPF (dto.getLogin()).
        // 2. Verificar se o idoso existe.
        // 3. Verificar se a senha enviada (dto.getSenha()), depois de criptografada,
        //    bate com a senha criptografada salva no banco.

        // Para nosso exemplo, vamos usar dados fixos:
        String cpfCorreto = "12345678900";
        String senhaCorreta = "idoso123";

        if (cpfCorreto.equals(dto.getLogin()) && senhaCorreta.equals(dto.getSenha())) {
            // Se o login estiver correto, gera uma resposta de sucesso
            String token = "TOKEN_JWT_GERADO_PARA_O_IDOSO_" + dto.getLogin(); // Token de mentira
            return new LoginResponseDTO("Login de idoso bem-sucedido!", token);
        } else {
            // Se o login estiver incorreto, lança uma exceção
            throw new RuntimeException("CPF ou senha do idoso incorretos.");
        }
    }

    public LoginResponseDTO autenticarFuncionario(LoginRequestDTO dto) {
        // --- LÓGICA DE AUTENTICAÇÃO SIMPLIFICADA (FAKE) ---
        // A lógica real seria similar à do idoso, mas buscando na tabela de funcionários.

        // Para nosso exemplo, vamos usar dados fixos:
        String usuarioCorreto = "func01";
        String senhaCorreta = "func123";

        if (usuarioCorreto.equals(dto.getLogin()) && senhaCorreta.equals(dto.getSenha())) {
            String token = "TOKEN_JWT_GERADO_PARA_O_FUNCIONARIO_" + dto.getLogin();
            return new LoginResponseDTO("Login de funcionário bem-sucedido!", token);
        } else {
            throw new RuntimeException("Usuário ou senha do funcionário incorretos.");
        }
    }
}