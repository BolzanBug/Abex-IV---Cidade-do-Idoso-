package br.com.cidadedoidoso.api_idosos.controller;

import br.com.cidadedoidoso.api_idosos.banco_de_dados.entities.Idoso;
import br.com.cidadedoidoso.api_idosos.dto.IdosoDTO;
import br.com.cidadedoidoso.api_idosos.service.IdosoService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/idosos")
@CrossOrigin(origins = "*")
public class IdosoController {

    private final IdosoService idosoService;

    public IdosoController(IdosoService idosoService) {
        this.idosoService = idosoService;
    }

    @PostMapping
    public ResponseEntity<Idoso> cadastrar(@Valid @RequestBody IdosoDTO dto) {
        Idoso novo = idosoService.cadastrar(dto);
        return ResponseEntity.ok(novo);
    }

    @GetMapping
    public ResponseEntity<List<Idoso>> listarTodos() {
        return ResponseEntity.ok(idosoService.listarTodos());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Idoso> buscarPorId(@PathVariable Long id) {
        return idosoService.buscarPorId(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}")
    public ResponseEntity<Idoso> atualizar(@PathVariable Long id, @Valid @RequestBody IdosoDTO dto) {
        Idoso atualizado = idosoService.atualizar(id, dto);
        return ResponseEntity.ok(atualizado);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletar(@PathVariable Long id) {
        idosoService.deletar(id);
        return ResponseEntity.noContent().build();
    }
}
