package br.com.cidadedoidoso.api_idosos.controller;

import br.com.cidadedoidoso.api_idosos.dto.IdosoDTO;
import br.com.cidadedoidoso.api_idosos.service.IdosoService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/idosos")
@CrossOrigin(origins = "*")
@RequiredArgsConstructor
public class IdosoController {

    private final IdosoService idosoService;

    @PostMapping
    public ResponseEntity<IdosoDTO> criar(@Valid @RequestBody IdosoDTO dto) {
        IdosoDTO criado = idosoService.criar(dto);
        return ResponseEntity.ok(criado);
    }

    @GetMapping
    public ResponseEntity<List<IdosoDTO>> listarTodos() {
        return ResponseEntity.ok(idosoService.listarTodos());
    }

    @GetMapping("/{id}")
    public ResponseEntity<IdosoDTO> buscarPorId(@PathVariable Long id) {
        return ResponseEntity.ok(idosoService.buscarPorId(id));
    }

    @PutMapping("/{id}")
    public ResponseEntity<IdosoDTO> atualizar(@PathVariable Long id,
                                              @Valid @RequestBody IdosoDTO dto) {
        return ResponseEntity.ok(idosoService.atualizar(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletar(@PathVariable Long id) {
        idosoService.deletar(id);
        return ResponseEntity.noContent().build();
    }
}
