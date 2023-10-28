package com.iab.api.dtos;

import lombok.Data;

@Data
public class ContadorTipoDTO {
    private int environment;
    private int social;
    private int governance;
    private int general;
    private int percentEnvironment;
    private int percentSocial;
    private int percentGovernance;
    private int percentGeneral;
}
