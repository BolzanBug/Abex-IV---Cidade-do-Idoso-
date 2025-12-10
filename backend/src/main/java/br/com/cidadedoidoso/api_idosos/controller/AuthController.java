package br.com.cidadedoidoso.api_idosos.controller;

import br.com.cidadedoidoso.api_idosos.dto.LoginRequestDTO;
import br.com.cidadedoidoso.api_idosos.dto.LoginResponseDTO;
import br.com.cidadedoidoso.api_idosos.service.AuthService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/login")
@CrossOrigin(origins = "*")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/idoso")
    public ResponseEntity<?> loginIdoso(@RequestBody LoginRequestDTO dto) {
        try {
            LoginResponseDTO response = authService.autenticarIdoso(dto);
            return ResponseEntity.ok(response);
        } catch (RuntimeException e) {
            return ResponseEntity
                    .status(HttpStatus.UNAUTHORIZED)
                    .body(Map.of("message", e.getMessage()));
        }
    }
}
