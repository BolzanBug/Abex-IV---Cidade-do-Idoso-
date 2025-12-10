package br.com.cidadedoidoso.api_idosos.service;

import br.com.cidadedoidoso.api_idosos.dto.LoginRequestDTO;
import br.com.cidadedoidoso.api_idosos.dto.LoginResponseDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.Optional;
//Inserção dos objetos e repositórios para consultas no banco
import br.com.cidadedoidoso.api_idosos.banco_de_dados.entities.Usuario;
import br.com.cidadedoidoso.api_idosos.banco_de_dados.entities.Funcionario;
import br.com.cidadedoidoso.api_idosos.banco_de_dados.entities.Idoso;
import br.com.cidadedoidoso.api_idosos.banco_de_dados.repositories.UsuarioRepository;
import br.com.cidadedoidoso.api_idosos.banco_de_dados.repositories.FuncionarioRepository;
import br.com.cidadedoidoso.api_idosos.banco_de_dados.repositories.IdosoRepository;

@Service
public class AuthService {

	// --- Injetando os Repositórios ---
    private final IdosoRepository idosoRepository;
    private final FuncionarioRepository funcionarioRepository;
    private final UsuarioRepository usuarioRepository;

    @Autowired
    public AuthService(IdosoRepository idosoRepository, FuncionarioRepository funcionarioRepository, UsuarioRepository usuarioRepository) {
		this.idosoRepository = idosoRepository;
		this.funcionarioRepository = funcionarioRepository;
		this.usuarioRepository = usuarioRepository; // <-- CORREÇÃO 3: Atribuir
	}
    public LoginResponseDTO autenticarIdoso(LoginRequestDTO dto) {
    	// --- LÓGICA DE AUTENTICAÇÃO SIMPLIFICADA (FAKE) ---
        // Em um projeto real, aqui você faria:
        // 1. Buscar no banco de dados um Idoso pelo CPF (dto.getLogin()). 
        // 2. Verificar se o idoso existe. - Fazer
        // 3. Verificar se a senha enviada (dto.getSenha()), depois de criptografada,
        //    bate com a senha criptografada salva no banco.
        // --- LÓGICA DE AUTENTICAÇÃO REAL (BÁSICA) ---

    	// 1. Buscar o USUÁRIO pelo CPF
    	Optional<Usuario> usuarioOptional = usuarioRepository.findByCpf(dto.getLogin());
        // 2. Verificar se o usuário existe
        if (usuarioOptional.isEmpty()) {
            throw new RuntimeException("CPF ou senha do idoso incorretos.");
        }
        
        Usuario usuarioDoBanco = usuarioOptional.get();

        // 3. NOVO PASSO: Verificar se esse usuário é DE FATO um IDOSO
        if (!idosoRepository.existsById(usuarioDoBanco.getIdUsuario())) {
            throw new RuntimeException("Este usuário não é um idoso.");
        }

        // 4. Verificar a senha (agora usando o 'usuarioDoBanco')
        if (usuarioDoBanco.getSenha().equals(dto.getSenha())) {
            String token = "TOKEN_JWT_GERADO_PARA_O_IDOSO_" + usuarioDoBanco.getCpf();
            return new LoginResponseDTO("Login de idoso bem-sucedido!", token);
        } else {
            throw new RuntimeException("CPF ou senha do idoso incorretos.");
        }
    }

    public LoginResponseDTO autenticarFuncionario(LoginRequestDTO dto) {
    	// 1. Buscar o USUÁRIO pelo 'login'
    	Optional<Usuario> usuarioOptional = usuarioRepository.findByLogin(dto.getLogin());

        // 2. Verificar se existe
        if (usuarioOptional.isEmpty()) {
            throw new RuntimeException("Usuário ou senha do funcionário incorretos.");
        }
        
        Usuario usuarioDoBanco = usuarioOptional.get();

        // 3. NOVO PASSO: Verificar se esse usuário é DE FATO um FUNCIONÁRIO
        if (!funcionarioRepository.existsById(usuarioDoBanco.getIdUsuario())) {
            throw new RuntimeException("Este usuário não é um funcionário.");
        }

        // 4. Verificar a senha
        if (usuarioDoBanco.getSenha().equals(dto.getSenha())) {
            String token = "TOKEN_JWT_GERADO_PARA_O_FUNCIONARIO_" + usuarioDoBanco.getLogin();
            return new LoginResponseDTO("Login de funcionário bem-sucedido!", token);
        } else {
            throw new RuntimeException("Usuário ou senha do funcionário incorretos.");
        }
    }

}