package br.com.cidadedoidoso.api_idosos.banco_de_dados.repositories;

import br.com.cidadedoidoso.api_idosos.banco_de_dados.entities.Idoso;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface IdosoRepository extends JpaRepository<Idoso, Long> {

    Optional<Idoso> findByEmail(String email);

    Optional<Idoso> findByCpf(String cpf);

    Optional<Idoso> findByEmailOrCpf(String email, String cpf);
}
