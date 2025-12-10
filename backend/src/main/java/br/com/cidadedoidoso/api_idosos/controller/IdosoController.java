package br.com.cidadedoidoso.api_idosos.controller;

import br.com.cidadedoidoso.api_idosos.banco_de_dados.entities.Idoso;
import br.com.cidadedoidoso.api_idosos.dto.IdosoDTO;
import br.com.cidadedoidoso.api_idosos.service.IdosoService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/idosos")
@CrossOrigin(origins = "*") // mantém se sua aplicação precisar aceitar requisições externas
@RequiredArgsConstructor
public class IdosoController {

    private final IdosoService idosoService;

    @PostMapping
    public ResponseEntity<Idoso> cadastrar(@RequestBody @Valid IdosoDTO dto) {
        Idoso salvo = idosoService.cadastrar(dto);
        return ResponseEntity.status(HttpStatus.CREATED).body(salvo);
    }

    @GetMapping
    public ResponseEntity<List<Idoso>> listar() {
        return ResponseEntity.ok(idosoService.listar());
    }
}
