package br.com.cidadedoidoso.api_idosos.banco_de_dados.entities;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

@Entity
@Table(name = "idosos")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Idoso {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nome;

    private String email;

    @Column(unique = true)
    private String cpf;

    private String senha;
}
