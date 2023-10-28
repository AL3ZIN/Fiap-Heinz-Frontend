package com.iab.api.dtos;

import lombok.Data;

@Data
public class ComentarioListDTO {
    private String usuario;
    private String comentario;
    private int curtidas;
    
    public ComentarioListDTO(String usuario, String comentario, int curtidas) {
        this.usuario = usuario;
        this.comentario = comentario;
        this.curtidas = curtidas;
    }
}
