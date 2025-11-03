package br.com.cidadedoidoso.api_idosos.banco_de_dados.repositories;
// (Confirme se este é o pacote correto)

import br.com.cidadedoidoso.api_idosos.banco_de_dados.entities.Funcionario;
import org.springframework.data.jpa.repository.JpaRepository;
// Removido: Optional

public interface FuncionarioRepository extends JpaRepository<Funcionario, Integer> { // <-- MUDOU PARA INTEGER


}