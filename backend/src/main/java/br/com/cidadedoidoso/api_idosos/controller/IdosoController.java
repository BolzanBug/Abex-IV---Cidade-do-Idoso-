package br.com.cidadedoidoso.api_idosos.controller;

import br.com.cidadedoidoso.api_idosos.dto.IdosoDTO;
import br.com.cidadedoidoso.api_idosos.service.IdosoService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/idosos")
public class IdosoController {

    @Autowired
    private IdosoService idosoService;

    @PostMapping
    public ResponseEntity<?> cadastrar(@RequestBody @Valid IdosoDTO dto) {
        return ResponseEntity.ok(idosoService.cadastrar(dto));
    }

    @GetMapping
    public ResponseEntity<?> listar() {
        return ResponseEntity.ok(idosoService.listar());
    }
}
