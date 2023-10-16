package com.iab.api.feedback;

import com.iab.api.usuario.DadosUsuario;

import jakarta.validation.constraints.NotNull;

public record DadosAtualizacaoFeedback(

                @NotNull int id,
                DadosUsuario usuario,
                TipoFeedback tipo,
                String descricao,
                Rating rating,
                int dataFeed

) {

}
