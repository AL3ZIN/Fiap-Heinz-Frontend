package com.iab.api.dtos;

import lombok.Data;

@Data
public class ContadorRatingDTO {
    private int positive;
    private int neutral;
    private int negative;
    private int percentPositive;
    private int percentNeutral;
    private int percentNegative;
}
