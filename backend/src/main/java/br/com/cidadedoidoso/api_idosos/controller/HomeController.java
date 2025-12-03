package br.com.cidadedoidoso.api_idosos.controller;

import br.com.cidadedoidoso.api_idosos.banco_de_dados.entities.Noticia;
import br.com.cidadedoidoso.api_idosos.banco_de_dados.entities.Usuario;
import br.com.cidadedoidoso.api_idosos.banco_de_dados.repositories.NoticiaRepository;
import br.com.cidadedoidoso.api_idosos.banco_de_dados.repositories.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/home")
@CrossOrigin(origins = "*")
public class HomeController {

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private NoticiaRepository noticiaRepository;

    // 1. ENDPOINT USERINFO (Agora conectado ao Banco)
    // URL: http://127.0.0.1:8080/home/userinfo?login=12345678900
    @GetMapping("/userinfo")
    public Map<String, String> getUserInfo(@RequestParam String login) {
        Map<String, String> userInfo = new HashMap<>();

        // Busca o usuário pelo login (ou CPF) salvo no banco
        // Nota: Assumindo que você tem um método findByLogin ou findByCpf no UsuarioRepository. 
        // Se não tiver, use o findAll e filtre, ou crie o método no repositório.
        Optional<Usuario> usuarioOpt = usuarioRepository.findByLogin(login); 

        if (usuarioOpt.isPresent()) {
            Usuario usuario = usuarioOpt.get();
            userInfo.put("nome", usuario.getNome());
            
            // Navega Usuario -> Endereco -> Cidade
            // Certifique-se que sua Entity Usuario tem o relacionamento @ManyToOne com Endereco configurado corretamente
            if (usuario.getEndereco() != null) {
                 userInfo.put("cidade", usuario.getEndereco().getCidade());
            } else {
                 userInfo.put("cidade", "Cidade não informada");
            }
        } else {
            userInfo.put("nome", "Visitante");
            userInfo.put("cidade", "Desconhecida");
        }
        return userInfo;
    }

    // 2. ENDPOINT NEWS (Conectado ao Banco)
    @GetMapping("/news")
    public Map<String, String> getNews() {
        Map<String, String> response = new HashMap<>();
        List<Noticia> noticias = noticiaRepository.findAll();

        if (noticias.size() > 0) {
            response.put("Titulo1", noticias.get(0).getTitulo());
            response.put("Descricao1", noticias.get(0).getDescricao());
            response.put("Classificacao1", noticias.get(0).getFonte());
            response.put("Imagem1", noticias.get(0).getImagemUrl()); // <--- NOVO
        }
        
        if (noticias.size() > 1) {
            response.put("Titulo2", noticias.get(1).getTitulo());
            response.put("Descricao2", noticias.get(1).getDescricao());
            response.put("Classificacao2", noticias.get(1).getFonte());
            response.put("Imagem2", noticias.get(1).getImagemUrl()); // <--- NOVO
        }

        if (noticias.size() > 2) {
            response.put("Titulo3", noticias.get(2).getTitulo());
            response.put("Descricao3", noticias.get(2).getDescricao());
            response.put("Classificacao3", noticias.get(2).getFonte());
            response.put("Imagem3", noticias.get(2).getImagemUrl()); // <--- NOVO
        }

        return response;
    }
}