package br.com.cidadedoidoso.api_idosos.dto;

public class LoginResponseDTO {

    private String tipoUsuario;
    private String nome;

    public LoginResponseDTO() {
    }

    public LoginResponseDTO(String tipoUsuario, String nome) {
        this.tipoUsuario = tipoUsuario;
        this.nome = nome;
    }

    public String getTipoUsuario() {
        return tipoUsuario;
    }

    public void setTipoUsuario(String tipoUsuario) {
        this.tipoUsuario = tipoUsuario;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }
}
