package br.com.cidadedoidoso.api_idosos.repositories;

import br.com.cidadedoidoso.api_idosos.banco_de_dados.entities.Idoso;
import org.springframework.data.jpa.repositories.JpaRepository;

public interface IdosoRepository extends JpaRepository<Idoso, Long> {
    boolean existsByCpf(String cpf);
    boolean existsByEmail(String email);  // Adicionado
}