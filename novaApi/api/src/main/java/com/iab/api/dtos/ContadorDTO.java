package com.iab.api.dtos;

import lombok.Data;

@Data
public class ContadorDTO {
    private long all;
    private int nps;
    private ContadorTipoDTO tipo;
    private ContadorRatingDTO rating;
}
