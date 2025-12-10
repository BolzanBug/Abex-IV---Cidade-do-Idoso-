package br.com.cidadedoidoso.api_idosos.service;

import br.com.cidadedoidoso.api_idosos.banco_de_dados.entities.Idoso;
import br.com.cidadedoidoso.api_idosos.dto.IdosoDTO;

import java.util.List;
import java.util.Optional;

public interface IdosoService {

    Idoso cadastrar(IdosoDTO dto);

    List<Idoso> listarTodos();

    Optional<Idoso> buscarPorId(Long id);

    Idoso atualizar(Long id, IdosoDTO dto);

    void deletar(Long id);
}
