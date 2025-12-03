package br.com.cidadedoidoso.api_idosos.banco_de_dados.repositories;

import br.com.cidadedoidoso.api_idosos.banco_de_dados.entities.Noticia;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface NoticiaRepository extends JpaRepository<Noticia, Long> {
    // Busca todas as notícias automaticamente
}