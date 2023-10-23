package com.iab.api.dtos;

import com.iab.api.enums.Canal;

import lombok.Data;

@Data
public class RankingDTO {

    private Canal canal;
    private Long numeroComentarios;

    // private int numeroUsuario;
    public RankingDTO(Canal canal, Long qtdComentarios) {
        this.canal = canal;
        this.numeroComentarios = qtdComentarios;
    }
}
