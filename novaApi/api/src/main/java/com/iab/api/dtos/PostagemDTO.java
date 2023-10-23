package com.iab.api.dtos;


import java.util.List;

import com.iab.api.enums.Canal;
import com.iab.api.models.Comentario;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PostagemDTO {
    private String perfil;
    private String embedLink;
    private String postagem;
    private Canal canal;
    private List<Comentario> comentarios;

}
