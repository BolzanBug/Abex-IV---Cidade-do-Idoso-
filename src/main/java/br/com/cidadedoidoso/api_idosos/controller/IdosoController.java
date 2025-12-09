package br.com.cidadedoidoso.api_idosos.api_idosos.controller;

import br.com.cidadedoidoso.api_idosos.dto.IdosoDTO;
import br.com.cidadedoidoso.api_idosos.model.Idoso;
import br.com.cidadedoidoso.api_idosos.service.IdosoService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/idosos")
public class IdosoController {

    private final IdosoService service;

    public IdosoController(IdosoService service) {
        this.service = service;
    }

    @PostMapping
    public ResponseEntity<Idoso> cadastrar(@Valid @RequestBody IdosoDTO dto) {  // @Valid ativa validações
        try {
            Idoso idoso = service.cadastrar(dto);
            return ResponseEntity.ok(idoso);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().build();  // Expande com @ExceptionHandler depois
        }
    }

    @GetMapping
    public ResponseEntity<List<Idoso>> listar() {
        return ResponseEntity.ok(service.listar());
    }
}