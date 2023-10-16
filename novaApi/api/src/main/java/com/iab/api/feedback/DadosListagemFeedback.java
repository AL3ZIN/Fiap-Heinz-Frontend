package com.iab.api.feedback;

import java.sql.Timestamp;

import com.iab.api.usuario.Usuario;

public record DadosListagemFeedback(int id, Usuario usuario, TipoFeedback tipo, String descricao, Rating rating,
      int dataFeed, Timestamp dataCadastro, Boolean ativo) {
   public DadosListagemFeedback(Feedback feedback) {
      this(feedback.getId(), feedback.getUsuario(), feedback.getTipo(), feedback.getDescricao(), feedback.getRating(),
            feedback.getDataFeed(), feedback.getDataCadastro(), feedback.getAtivo());
   }
}
