package com.iab.api.dtos;

import lombok.Data;

@Data
public class MonthlyRatingOverviewDTO {
    private Long[] positiveCount = new Long[6];
    private Long[] negativeCount =new Long[6];
    private Long[] neutralCount = new Long[6];
    private String[] mes = new String[6];

    public MonthlyRatingOverviewDTO(Long[] positiveCount, Long[] negativeCount, Long neutralCount[], String mes[]) {
        this.positiveCount = positiveCount;
        this.negativeCount = negativeCount;
        this.neutralCount = neutralCount;
        this.mes = mes;
    }
}