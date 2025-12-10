package br.com.cidadedoidoso.api_idosos.controller;

import br.com.cidadedoidoso.api_idosos.banco_de_dados.entities.Idoso;
import br.com.cidadedoidoso.api_idosos.banco_de_dados.repositories.IdosoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/idosos")
@CrossOrigin(origins = "*")
public class IdosoController {

    @Autowired
    private IdosoRepository idosoRepository;

    @GetMapping
    public List<Idoso> listarIdosos() {
        return idosoRepository.findAll();
    }
}

//ROTA PARA CHAMAR A LISTAGEM "http://localhost:8080/idosos"