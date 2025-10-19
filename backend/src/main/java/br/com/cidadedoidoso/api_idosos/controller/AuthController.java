package br.com.cidadedoidoso.api_idosos.controller;

import br.com.cidadedoidoso.api_idosos.dto.LoginRequestDTO;
import br.com.cidadedoidoso.api_idosos.dto.LoginResponseDTO;
import br.com.cidadedoidoso.api_idosos.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.Map;

@RestController
@RequestMapping("/login") // Define a base da URL para "/login"
@CrossOrigin(origins = "*")
public class AuthController {

    @Autowired // Injeção de dependência do nosso serviço de autenticação
    private AuthService authService;

    @PostMapping("/idoso")
    public ResponseEntity<?> loginIdoso(@RequestBody LoginRequestDTO dto) {
        try {
            LoginResponseDTO response = authService.autenticarIdoso(dto);
            return ResponseEntity.ok(response);
        } catch (RuntimeException e) {
            // Retorna um JSON com a mensagem de erro e o status 401 (Não Autorizado)
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("message", e.getMessage()));
        }
    }

    @PostMapping("/funcionario")
    public ResponseEntity<?> loginFuncionario(@RequestBody LoginRequestDTO dto) {
        try {
            LoginResponseDTO response = authService.autenticarFuncionario(dto);
            return ResponseEntity.ok(response);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("message", e.getMessage()));
        }
    }
}