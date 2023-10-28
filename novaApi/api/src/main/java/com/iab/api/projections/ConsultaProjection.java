package com.iab.api.projections;

import java.util.Date;

import com.iab.api.enums.Canal;

public interface ConsultaProjection {
    Long getId();
    String getPerfil();
    String getPostagemLink();
    String getEmbedLink();
    String getLegenda();
    Canal getCanal();
    int getNps();
    int getNumeroComentarios();
    Date getDataCadastro();

}
