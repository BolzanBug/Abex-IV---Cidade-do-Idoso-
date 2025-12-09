package br.com.cidadedoidoso.api_idosos.controller;

import br.com.cidadedoidoso.api_idosos.dto.PasswordResetRequest;
import br.com.cidadedoidoso.api_idosos.service.PasswordResetService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
public class PasswordResetController {

    @Autowired
    private PasswordResetService passwordResetService;

    @PostMapping("/reset-password")
    public ResponseEntity<?> resetPassword(@RequestBody PasswordResetRequest request) {

        boolean sucesso = passwordResetService.resetarSenha(request.getEmail());

        if (!sucesso) {
            return ResponseEntity.badRequest().body("E-mail inválido ou usuário não encontrado.");
        }

        return ResponseEntity.ok("Uma nova senha foi enviada ao e-mail informado!");
    }
}
