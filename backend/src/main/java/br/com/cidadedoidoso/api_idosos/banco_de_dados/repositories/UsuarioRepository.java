package br.com.cidadedoidoso.api_idosos.banco_de_dados.repositories;
// (Use o seu pacote de repositórios correto acima)

import br.com.cidadedoidoso.api_idosos.banco_de_dados.entities.Usuario;
// (Importe sua entidade Usuario.java acima)
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface UsuarioRepository extends JpaRepository<Usuario, Integer> {

    // Busca pelo CPF (para o Idoso)
    Optional<Usuario> findByCpf(String cpf);
    
    // Busca pelo Login (para o Funcionário)
    Optional<Usuario> findByLogin(String login);
}