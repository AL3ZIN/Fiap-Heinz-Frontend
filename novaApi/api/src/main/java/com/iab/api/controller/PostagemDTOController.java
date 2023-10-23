package com.iab.api.controller;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.iab.api.dtos.PostagemDTO;
import com.iab.api.dtos.RankingDTO;
import com.iab.api.models.Comentario;
import com.iab.api.models.Perfil;
import com.iab.api.projections.RankingProjection;
import com.iab.api.repositories.ComentarioRepository;
import com.iab.api.repositories.PerfilRepository;

import jakarta.transaction.Transactional;


@CrossOrigin
@RestController
@RequestMapping("/api/postagem")
public class PostagemDTOController {

    @Autowired
    private PerfilRepository perfilRepository;
    @Autowired
    private ComentarioRepository comentarioRepository;

    @Transactional
    @PostMapping("/save")
    public PostagemDTO savePostagemDTO(@RequestBody PostagemDTO PostagemDTO) {

        Perfil perfil = new Perfil();
        perfil.setNome(PostagemDTO.getPerfil());
        perfil.setEmbedLink(PostagemDTO.getEmbedLink());
        perfil.setPostagem(PostagemDTO.getPostagem());
        perfil.setCanal(PostagemDTO.getCanal());
        perfil = perfilRepository.save(perfil);

        for (Comentario comentario : PostagemDTO.getComentarios()) {
            comentario.setPerfil(perfil);

            comentario = comentarioRepository.save(comentario);
        }

        return PostagemDTO;
    }

    @Transactional
    @PutMapping("/update")
    public PostagemDTO updatePost(@RequestBody PostagemDTO updatedPost) {
        // Recupere o perfil existente com base na URL da postagem.
        Perfil perfil = perfilRepository.findByPostagem(updatedPost.getPostagem());

        if (perfil != null) {
            for (Comentario comentario : updatedPost.getComentarios()) {
                Comentario existingComentario = perfil.getComentarios().stream()
                        .filter(existing -> existing.getComentario().equals(comentario.getComentario()) &&
                                existing.getUsuario().equals(comentario.getUsuario()))
                        .findFirst()
                        .orElse(null);

                if (existingComentario != null) {
                    existingComentario.setCurtidas(comentario.getCurtidas());
                    comentarioRepository.save(existingComentario);
                } else {
                    comentario.setPerfil(perfil);
                    perfil.getComentarios().add(comentario);
                    comentarioRepository.save(comentario);
                }
            }
            return updatedPost;
        } else {
            return null;
        }
    }

    @Transactional
    @DeleteMapping("excluir/{id}")
    public void excluir(@PathVariable Long id) {
        perfilRepository.deleteById(id);
    }

    @GetMapping("ranking")
    public List<RankingDTO> getRankingSocialMedia() {
        List<RankingProjection> rankingList = comentarioRepository.findRankingCanais();
    List<RankingDTO> rankingDTOList = rankingList.stream()
            .map(result -> new RankingDTO(result.getCanal(), result.getQtdComentarios()))
            .collect(Collectors.toList());
    return rankingDTOList;
    }
    

}
