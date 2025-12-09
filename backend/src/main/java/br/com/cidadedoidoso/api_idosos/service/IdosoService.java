package br.com.cidadedoidoso.api_idosos.service;

import br.com.cidadedoidoso.api_idosos.dto.IdosoDTO;
import br.com.cidadedoidoso.api_idosos.entities.Idoso;
import java.util.List;

public interface IdosoService {
    Idoso cadastrar(IdosoDTO dto);
    List<Idoso> listar();
}