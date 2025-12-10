package br.com.cidadedoidoso.api_idosos.service.impl;

import br.com.cidadedoidoso.api_idosos.banco_de_dados.entities.Idoso;
import br.com.cidadedoidoso.api_idosos.banco_de_dados.repositories.IdosoRepository;
import br.com.cidadedoidoso.api_idosos.dto.IdosoDTO;
import br.com.cidadedoidoso.api_idosos.service.IdosoService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class IdosoServiceImpl implements IdosoService {

    private final IdosoRepository repository;

    @Override
    public IdosoDTO criar(IdosoDTO dto) {
        Idoso idoso = toEntity(dto);
        Idoso salvo = repository.save(idoso);
        return toDTO(salvo);
    }

    @Override
    public List<IdosoDTO> listarTodos() {
        return repository.findAll().stream()
                .map(this::toDTO)
                .toList();
    }

    @Override
    public IdosoDTO buscarPorId(Long id) {
        Idoso idoso = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Idoso não encontrado"));
        return toDTO(idoso);
    }

    @Override
    public IdosoDTO atualizar(Long id, IdosoDTO dto) {
        Idoso idoso = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Idoso não encontrado"));

        idoso.setNome(dto.getNome());
        idoso.setEmail(dto.getEmail());
        idoso.setTelefone(dto.getTelefone());
        idoso.setDataNascimento(dto.getDataNascimento());
        idoso.setGenero(dto.getGenero());
        idoso.setCpf(dto.getCpf());
        idoso.setSenha(dto.getSenha());
        idoso.setEndereco(dto.getEndereco());
        idoso.setCidade(dto.getCidade());
        idoso.setEstado(dto.getEstado());
        idoso.setCep(dto.getCep());

        repository.save(idoso);

        return toDTO(idoso);
    }

    @Override
    public void deletar(Long id) {
        repository.deleteById(id);
    }

    private Idoso toEntity(IdosoDTO dto) {
        Idoso idoso = new Idoso();
        idoso.setNome(dto.getNome());
        idoso.setEmail(dto.getEmail());
        idoso.setTelefone(dto.getTelefone());
        idoso.setDataNascimento(dto.getDataNascimento());
        idoso.setGenero(dto.getGenero());
        idoso.setCpf(dto.getCpf());
        idoso.setSenha(dto.getSenha());
        idoso.setEndereco(dto.getEndereco());
        idoso.setCidade(dto.getCidade());
        idoso.setEstado(dto.getEstado());
        idoso.setCep(dto.getCep());
        return idoso;
    }

    private IdosoDTO toDTO(Idoso idoso) {
        IdosoDTO dto = new IdosoDTO();
        dto.setNome(idoso.getNome());
        dto.setEmail(idoso.getEmail());
        dto.setTelefone(idoso.getTelefone());
        dto.setDataNascimento(idoso.getDataNascimento());
        dto.setGenero(idoso.getGenero());
        dto.setCpf(idoso.getCpf());
        dto.setSenha(idoso.getSenha());
        dto.setEndereco(idoso.getEndereco());
        dto.setCidade(idoso.getCidade());
        dto.setEstado(idoso.getEstado());
        dto.setCep(idoso.getCep());
        return dto;
    }
}
