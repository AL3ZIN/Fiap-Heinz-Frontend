package com.iab.api.dtos;

import lombok.Data;

@Data
public class ComentariosAggregateDTO {
    private Long numeroTipoEnvironment;
    private Long numeroTipoSocial;
    private Long numeroTipoGovernance;
    private Long numeroTipoGeneral;
    private Double numeroNpsEnvironment;
    private Double numeroNpsSocial;
    private Double numeroNpsGovernance;
    private Double numeroNpsGeneral;


}
