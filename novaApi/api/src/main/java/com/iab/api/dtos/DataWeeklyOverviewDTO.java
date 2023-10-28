package com.iab.api.dtos;

import lombok.Data;

@Data
public class DataWeeklyOverviewDTO {

    private int[] numeroComentariosEnvironment = new int[5];
    private int[] numeroComentariosSocial = new int[5];
    private int[] numeroComentariosGovernance = new int[5];
    private int[] numeroComentariosGeneral = new int[5];

    public DataWeeklyOverviewDTO(int[] envCounts, int[] socCounts, int[] govCounts, int[] genCounts) {
        this.numeroComentariosEnvironment = envCounts;
        this.numeroComentariosSocial = socCounts;
        this.numeroComentariosGovernance = govCounts;
        this.numeroComentariosGeneral = genCounts;
    }
}
