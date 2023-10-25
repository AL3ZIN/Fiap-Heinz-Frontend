package com.iab.api.dtos;


import java.util.Date;
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
    private String legenda;
    private Canal canal;
    private Date  dataPostagem;
    private Date  dataCadastro;
    private List<Comentario> comentarios;

}
