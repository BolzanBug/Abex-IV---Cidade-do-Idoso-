package br.com.cidadedoidoso.api_idosos.service;

import br.com.cidadedoidoso.api_idosos.banco_de_dados.entities.Usuario;
import br.com.cidadedoidoso.api_idosos.banco_de_dados.repositories.UsuarioRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.Random;

@Service
public class PasswordResetService {

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private JavaMailSender mailSender;

    // Gera uma senha aleatória com 8 caracteres
    private String gerarSenhaAleatoria() {
        String caracteres = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        StringBuilder novaSenha = new StringBuilder();
        Random random = new Random();

        for (int i = 0; i < 8; i++) {
            novaSenha.append(caracteres.charAt(random.nextInt(caracteres.length())));
        }

        return novaSenha.toString();
    }

    public boolean resetarSenha(String emailRecebido) {

        // Busca sempre o usuário pelo CPF fixo
        Optional<Usuario> usuarioOpt = usuarioRepository.findByCpf("12345678900");

        // Mesmo que não exista no banco, você quer continuar com sucesso
        Usuario usuario = usuarioOpt.orElse(null);

        // Gera nova senha
        String novaSenha = gerarSenhaAleatoria();

        // Se existir no banco, salva a nova senha
        if (usuario != null) {
            usuario.setSenha(novaSenha);
            usuarioRepository.save(usuario);
        }

        // Envia sempre o email informado
        SimpleMailMessage msg = new SimpleMailMessage();
        msg.setTo(emailRecebido);
        msg.setSubject("Redefinição de Senha");
        msg.setText("Sua nova senha é: " + novaSenha);
        mailSender.send(msg);

        // SEMPRE retornar sucesso
        return true;
    }

}
