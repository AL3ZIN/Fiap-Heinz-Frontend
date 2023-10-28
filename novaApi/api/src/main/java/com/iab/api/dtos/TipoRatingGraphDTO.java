package com.iab.api.dtos;

import lombok.Data;

@Data
public class TipoRatingGraphDTO {
    private int[] countTipo = new int[3];
    private int[] npsTipo = new int[3];

    public TipoRatingGraphDTO(int[] countTipo, int[] npsTipo) {
        this.countTipo = countTipo;
        this.npsTipo = npsTipo;
    }
}
