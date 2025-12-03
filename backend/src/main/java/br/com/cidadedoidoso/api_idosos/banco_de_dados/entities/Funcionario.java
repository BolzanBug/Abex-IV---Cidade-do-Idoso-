package br.com.cidadedoidoso.api_idosos.banco_de_dados.entities;
// (Confirme se este é o pacote correto)

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.Column;

@Entity
@Table(name = "funcionario") // <-- Mapeia para a tabela 'funcionario'
public class Funcionario {

    @Id // <-- Marca como ID
    @Column(name = "id_usuario") // <-- Mapeia para a coluna FK do banco
    private Integer idUsuario; // <-- Usa Integer, igual ao Usuario.java

    // --- Não tem outros campos nesta tabela ---

    // Getters e Setters
    public Integer getIdUsuario() {
        return idUsuario;
    }
    public void setIdUsuario(Integer idUsuario) {
        this.idUsuario = idUsuario;
    }
}