package br.com.cidadedoidoso.api_idosos.service.impl;

import br.com.cidadedoidoso.api_idosos.banco_de_dados.entities.Idoso;
import br.com.cidadedoidoso.api_idosos.banco_de_dados.repositories.IdosoRepository;
import br.com.cidadedoidoso.api_idosos.dto.IdosoDTO;
import br.com.cidadedoidoso.api_idosos.service.IdosoService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class IdosoServiceImpl implements IdosoService {

    private final IdosoRepository idosoRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public IdosoDTO criar(IdosoDTO dto) {

        if (idosoRepository.existsByEmail(dto.getEmail())) {
            throw new RuntimeException("Email já cadastrado");
        }

        if (idosoRepository.existsByCpf(dto.getCpf())) {
            throw new RuntimeException("CPF já cadastrado");
        }

        Idoso idoso = new Idoso();
        idoso.setNome(dto.getNome());
        idoso.setEmail(dto.getEmail());
        idoso.setCpf(dto.getCpf());
        idoso.setSenha(passwordEncoder.encode(dto.getSenha()));

        idoso = idosoRepository.save(idoso);

        return toDTO(idoso);
    }

    @Override
    public IdosoDTO atualizar(Long id, IdosoDTO dto) {
        Idoso idoso = idosoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Idoso não encontrado"));

        idoso.setNome(dto.getNome());
        idoso.setEmail(dto.getEmail());
        idoso.setCpf(dto.getCpf());

        if (dto.getSenha() != null && !dto.getSenha().isBlank()) {
            idoso.setSenha(passwordEncoder.encode(dto.getSenha()));
        }

        idoso = idosoRepository.save(idoso);

        return toDTO(idoso);
    }

    @Override
    public List<IdosoDTO> listarTodos() {
        return idosoRepository.findAll()
                .stream()
                .map(this::toDTO)
                .toList();
    }

    @Override
    public IdosoDTO buscarPorId(Long id) {
        Idoso idoso = idosoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Idoso não encontrado"));

        return toDTO(idoso);
    }

    @Override
    public void deletar(Long id) {
        if (!idosoRepository.existsById(id)) {
            throw new RuntimeException("Idoso não encontrado");
        }
        idosoRepository.deleteById(id);
    }

    private IdosoDTO toDTO(Idoso idoso) {
        IdosoDTO dto = new IdosoDTO();
        dto.setNome(idoso.getNome());
        dto.setEmail(idoso.getEmail());
        dto.setCpf(idoso.getCpf());
        // por segurança, não devolvemos a senha
        dto.setSenha(null);
        return dto;
    }
}
