package com.iab.api.feedback;

import java.sql.Timestamp;

import com.iab.api.usuario.DadosUsuario;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record DadosCadastroFeedback(

        @NotNull @Valid DadosUsuario usuario,
        @NotNull TipoFeedback tipo,
        @NotBlank String descricao,
        @NotNull Rating rating,
        @NotNull int dataFeed,
        @NotNull Timestamp dataCadastro) {
}
