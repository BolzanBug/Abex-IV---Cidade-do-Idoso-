package br.com.cidadedoidoso.api_idosos.banco_de_dados.entities;
// (Confirme se este é o pacote correto)

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.Column;
// Removido: GeneratedValue, GenerationType

@Entity
@Table(name = "idoso") // <-- Corrigido para 'idoso' (sem 's')
public class Idoso {

    @Id // <-- Marca como ID
    @Column(name = "id_usuario") // <-- Mapeia para a coluna FK do banco
    private Integer idUsuario; // <-- Usa Integer, igual ao Usuario.java

    @Column(name = "obs", nullable = false)
    private String obs;

    @Column(name = "restricao_medica", nullable = false)
    private String restricaoMedica;

    // --- Removido: cpf, senha ---

    // Getters e Setters
    public Integer getIdUsuario() {
        return idUsuario;
    }
    public void setIdUsuario(Integer idUsuario) {
        this.idUsuario = idUsuario;
    }
    public String getObs() {
        return obs;
    }
    public void setObs(String obs) {
        this.obs = obs;
    }
    public String getRestricaoMedica() {
        return restricaoMedica;
    }
    public void setRestricaoMedica(String restricaoMedica) {
        this.restricaoMedica = restricaoMedica;
    }
}