package br.com.cidadedoidoso.api_idosos.service;

import br.com.cidadedoidoso.api_idosos.dto.IdosoDTO;

import java.util.List;

public interface IdosoService {

    IdosoDTO criar(IdosoDTO dto);

    IdosoDTO atualizar(Long id, IdosoDTO dto);

    List<IdosoDTO> listarTodos();

    IdosoDTO buscarPorId(Long id);

    void deletar(Long id);
}
