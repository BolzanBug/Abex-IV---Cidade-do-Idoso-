package br.com.cidadedoidoso.api_idosos.service.impl;

import br.com.cidadedoidoso.api_idosos.banco_de_dados.entities.Idoso;
import br.com.cidadedoidoso.api_idosos.banco_de_dados.repositories.IdosoRepository;
import br.com.cidadedoidoso.api_idosos.dto.IdosoDTO;
import br.com.cidadedoidoso.api_idosos.service.IdosoService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class IdosoServiceImpl implements IdosoService {

    private final IdosoRepository idosoRepository;

    @Override
    public Idoso cadastrar(IdosoDTO dto) {

        // Verifica se já existe CPF
        idosoRepository.findByCpf(dto.getCpf())
                .ifPresent(i -> {
                    throw new RuntimeException("CPF já cadastrado.");
                });

        // Verifica se já existe email
        idosoRepository.findByEmail(dto.getEmail())
                .ifPresent(i -> {
                    throw new RuntimeException("E-mail já cadastrado.");
                });

        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();

        Idoso idoso = new Idoso();
        idoso.setNome(dto.getNome());
        idoso.setEmail(dto.getEmail());
        idoso.setCpf(dto.getCpf());
        idoso.setSenha(encoder.encode(dto.getSenha())); // senha criptografada

        return idosoRepository.save(idoso);
    }

    @Override
    public List<Idoso> listar() {
        return idosoRepository.findAll();
    }
}
