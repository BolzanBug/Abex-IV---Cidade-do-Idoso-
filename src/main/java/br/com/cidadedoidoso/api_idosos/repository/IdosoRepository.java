package br.com.cidadedoidoso.api_idosos.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import br.com.cidadedoidoso.api_idosos.model.Idoso;

public interface IdosoRepository extends JpaRepository<Idoso, Long> {
    boolean existsByCpf(String cpf);
    boolean existsByEmail(String email);  // Adicionado
}