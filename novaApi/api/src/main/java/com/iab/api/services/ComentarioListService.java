package com.iab.api.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.iab.api.dtos.ComentarioListDTO;
import com.iab.api.models.Comentario;
import com.iab.api.repositories.ComentarioRepository;

@Service
public class ComentarioListService {

    @Autowired
    private ComentarioRepository comentarioRepository;

    public Page<ComentarioListDTO> getComentariosByPerfilId(int idPerfil, Pageable pageable) {
        Page<Comentario> comentarios = comentarioRepository.findByPerfilId(idPerfil, pageable);
        return comentarios.map(comentario -> new ComentarioListDTO(
                comentario.getUsuario(),
                comentario.getComentario(),
                comentario.getCurtidas()
        ));
    }
}

