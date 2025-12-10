package br.com.cidadedoidoso.api_idosos.service.impl;

import br.com.cidadedoidoso.api_idosos.banco_de_dados.entities.Idoso;
import br.com.cidadedoidoso.api_idosos.banco_de_dados.repositories.IdosoRepository;
import br.com.cidadedoidoso.api_idosos.dto.IdosoDTO;
import br.com.cidadedoidoso.api_idosos.service.IdosoService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class IdosoServiceImpl implements IdosoService {

    private final IdosoRepository idosoRepository;
    private final BCryptPasswordEncoder passwordEncoder;

    public IdosoServiceImpl(IdosoRepository idosoRepository, BCryptPasswordEncoder passwordEncoder) {
        this.idosoRepository = idosoRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public Idoso cadastrar(IdosoDTO dto) {

        // Verifica se já existe por email ou CPF
        idosoRepository.findByEmailOrCpf(dto.getEmail(), dto.getCpf())
                .ifPresent(i -> {
                    throw new RuntimeException("Já existe um idoso cadastrado com esse email ou CPF.");
                });

        Idoso idoso = new Idoso();
        idoso.setNome(dto.getNome());
        idoso.setEmail(dto.getEmail());
        idoso.setCpf(dto.getCpf());
        idoso.setSenha(passwordEncoder.encode(dto.getSenha()));

        return idosoRepository.save(idoso);
    }

    @Override
    public List<Idoso> listarTodos() {
        return idosoRepository.findAll();
    }

    @Override
    public Optional<Idoso> buscarPorId(Long id) {
        return idosoRepository.findById(id);
    }

    @Override
    public Idoso atualizar(Long id, IdosoDTO dto) {
        Idoso idoso = idosoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Idoso não encontrado"));

        idoso.setNome(dto.getNome());
        idoso.setEmail(dto.getEmail());
        idoso.setCpf(dto.getCpf());
        idoso.setSenha(passwordEncoder.encode(dto.getSenha()));

        return idosoRepository.save(idoso);
    }

    @Override
    public void deletar(Long id) {
        Idoso idoso = idosoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Idoso não encontrado"));
        idosoRepository.delete(idoso);
    }
}
