package br.com.cidadedoidoso.api_idosos.banco_de_dados.repositories;


import br.com.cidadedoidoso.api_idosos.banco_de_dados.entities.Idoso;
import org.springframework.data.jpa.repository.JpaRepository;


public interface IdosoRepository extends JpaRepository<Idoso, Integer> { 

}