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

        // Validação simples de e-mail
        if (emailRecebido == null || !emailRecebido.contains("@") || !emailRecebido.contains(".")) {
            return false;
        }

        // Buscar usuário pelo e-mail
        Optional<Usuario> usuarioOpt = usuarioRepository.findByEmail(emailRecebido);

        if (usuarioOpt.isEmpty()) {
            return false; // e-mail não existe no banco
        }

        Usuario usuario = usuarioOpt.get();

        // Gera nova senha aleatória
        String novaSenha = gerarSenhaAleatoria();

        // Atualiza a senha no banco
        usuario.setSenha(novaSenha);
        usuarioRepository.save(usuario);

        // Envia o e-mail de redefinição
        SimpleMailMessage msg = new SimpleMailMessage();
        msg.setTo(usuario.getEmail()); // envia para o e-mail cadastrado do usuário
        msg.setSubject("Redefinição de Senha");
        msg.setText(
                "Olá!\n\n" +
                        "Uma solicitação de redefinição de senha foi realizada.\n\n" +
                        "Sua nova senha é: " + novaSenha + "\n\n" +
                        "Recomendamos que você altere essa senha após fazer login.\n\n" +
                        "Atenciosamente,\nSistema Cidade do Idoso"
        );

        mailSender.send(msg);

        return true;
    }
}
