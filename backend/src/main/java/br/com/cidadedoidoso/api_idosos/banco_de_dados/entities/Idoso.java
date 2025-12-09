package br.com.cidadedoidoso.api_idosos.banco_de_dados.entities;


import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lombok.Data;

@Entity
@Table(name = "idosos")
@Data  // Lombok
public class Idoso {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    @Column(nullable = false, length = 100)
    private String nome;

    @NotBlank
    @Email
    @Column(nullable = false, unique = true)
    private String email;

    @NotBlank
    @Column(nullable = false)
    private String senha;  // Será hasheada no service

    @NotBlank
    @Pattern(regexp = "\\d{11}")
    @Column(nullable = false, unique = true, length = 11)
    private String cpf;
}