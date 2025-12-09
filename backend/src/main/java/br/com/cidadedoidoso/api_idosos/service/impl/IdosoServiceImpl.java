package br.com.cidadedoidoso.api_idosos.service.impl;

import br.com.cidadedoidoso.api_idosos.service.IdosoService;
import br.com.cidadedoidoso.api_idosos.dto.IdosoDTO;
import br.com.cidadedoidoso.api_idosos.entities.Idoso;
import br.com.cidadedoidoso.api_idosos.repository.IdosoRepository;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class IdosoServiceImpl implements IdosoService {

    private final IdosoRepository repository;
    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    public IdosoServiceImpl(IdosoRepository repository) {
        this.repository = repository;
    }

    @Override
    public Idoso cadastrar(IdosoDTO dto) {
        // Checa duplicata
        if (repository.existsByCpf(dto.getCpf())) {
            throw new RuntimeException("CPF já cadastrado");
        }
        if (repository.existsByEmail(dto.getEmail())) {  // Adicione existsByEmail no Repository se quiser
            throw new RuntimeException("Email já cadastrado");
        }

        Idoso i = new Idoso();
        i.setNome(dto.getNome());
        i.setEmail(dto.getEmail());
        i.setSenha(passwordEncoder.encode(dto.getSenha()));  // Hash da senha
        i.setCpf(dto.getCpf());
        return repository.save(i);
    }

    @Override
    public List<Idoso> listar() {
        return repository.findAll();
    }
}