package com.iab.api.usuario;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record DadosUsuario(
    @NotBlank
    String nome, 
    @NotNull
    Canal canal) {
    
}
