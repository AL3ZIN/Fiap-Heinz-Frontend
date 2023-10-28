package com.iab.api.controller;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.iab.api.dtos.ConsultaDTO;
import com.iab.api.dtos.PostagemDTO;
import com.iab.api.dtos.RankingDTO;
import com.iab.api.models.Comentario;
import com.iab.api.models.Perfil;
import com.iab.api.projections.ConsultaProjection;
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
    public ResponseEntity<PostagemDTO> savePostagemDTO(@RequestBody PostagemDTO postagemDTO) {
        if (postagemDTO == null) {
            return ResponseEntity.badRequest().build();
        }

        Perfil perfil = new Perfil();
        perfil.setPerfil(postagemDTO.getPerfil());
        perfil.setEmbedLink(postagemDTO.getEmbedLink());
        perfil.setPostagemLink(postagemDTO.getPostagemLink());
        perfil.setLegenda(postagemDTO.getLegenda());
        perfil.setCanal(postagemDTO.getCanal());
        perfil.setDataPostagem(postagemDTO.getDataPostagem());
        perfil.setDataCadastro(postagemDTO.getDataCadastro());
        perfil = perfilRepository.save(perfil);

        for (Comentario comentario : postagemDTO.getComentarios()) {
            comentario.setPerfil(perfil);
            comentarioRepository.save(comentario);
        }

        return ResponseEntity.ok(postagemDTO);
    }

    @Transactional
    @PutMapping("/update")
    public ResponseEntity<PostagemDTO> updatePost(@RequestBody PostagemDTO updatedPost) {
        if (updatedPost == null) {
            return ResponseEntity.badRequest().build();
        }

        Perfil perfil = perfilRepository.findByPostagemLink(updatedPost.getPostagemLink());

        if (perfil != null) {
            List<Comentario> perfilComentarios = perfil.getComentarios();
            for (Comentario comentario : updatedPost.getComentarios()) {
                Comentario existingComentario = perfilComentarios.stream()
                        .filter(existing -> existing.getComentario().equals(comentario.getComentario()) &&
                                existing.getUsuario().equals(comentario.getUsuario()))
                        .findFirst()
                        .orElse(null);

                if (existingComentario != null) {
                    // Atualizar o número de curtidas do comentário existente
                    existingComentario.setCurtidas(comentario.getCurtidas());
                    comentarioRepository.save(existingComentario);
                } else {
                    // Se o comentário não existe, adicione-o ao perfil
                    comentario.setPerfil(perfil);
                    perfil.getComentarios().add(comentario);
                    comentarioRepository.save(comentario);
                }
            }
            // Retorne a postagem atualizada
            return ResponseEntity.ok(updatedPost);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @Transactional
    @DeleteMapping("excluir/{id}")
    public ResponseEntity<Void> excluir(@PathVariable Long id) {
        perfilRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("ranking")
    public List<RankingDTO> getRankingSocialMedia() {
        List<RankingProjection> rankingList = comentarioRepository.findRankingCanais();
        List<RankingDTO> rankingDTOList = rankingList.stream()
                .map(result -> new RankingDTO(result.getCanal(), result.getQtdComentarios()))
                .collect(Collectors.toList());
        return rankingDTOList;
    }

    @GetMapping("/consulta")
    public List<ConsultaDTO> getConsultaList(@RequestParam(required = false) String postagemLink) {
        List<ConsultaProjection> consultaList;

        if (postagemLink == null || postagemLink.isEmpty()) {
            consultaList = perfilRepository.getConsulta();
        } else {
            consultaList = perfilRepository.getConsultaByPostagemLink(postagemLink);
        }

        List<ConsultaDTO> consultaDTOList = consultaList.stream()
                .map(result -> new ConsultaDTO(
                        result.getId(),
                        result.getPerfil(),
                        result.getPostagemLink(),
                        result.getEmbedLink(),
                        result.getLegenda(),
                        result.getCanal(),
                        result.getNumeroComentarios(),
                        result.getNps(),
                        result.getDataCadastro()))
                .collect(Collectors.toList());

        return consultaDTOList;
    }
}
