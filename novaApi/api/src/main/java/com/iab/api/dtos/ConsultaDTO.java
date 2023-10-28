package com.iab.api.dtos;

import java.util.Date;

import com.iab.api.enums.Canal;

import lombok.Data;

@Data
public class ConsultaDTO {
    private long id;
    private String perfil;
    private String postagemLink;
    private String embedLink;
    private String legenda;
    private Canal canal;
    private int nps;
    private int numeroComentarios;
    private Date dataCadastro;
    
    public ConsultaDTO(Long id, String perfil, String postagemLink, String embedLink, String legenda, Canal canal, int numeroComentarios, int nps,
            Date dataCadastro) {
        this.id = id;
        this.perfil = perfil;
        this.postagemLink = postagemLink;
        this.embedLink = embedLink;
        this.legenda = legenda;
        this.canal = canal;
        this.numeroComentarios = numeroComentarios;
        this.nps = nps;
        this.dataCadastro = dataCadastro;
    }
}
