package com.iab.api.feedback;

import java.sql.Timestamp;

import com.iab.api.usuario.Usuario;

import jakarta.persistence.Embedded;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Table(name = "feedbacks")
@Entity(name = "Feedback")
@Getter
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(of = "id")
public class Feedback {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Embedded
    private Usuario usuario;

    @Enumerated(EnumType.STRING)
    private TipoFeedback tipo;
    private String descricao;

    @Enumerated(EnumType.STRING)
    private Rating rating;

    private int dataFeed;
    private Timestamp dataCadastro;
    private Boolean ativo;

    public Feedback(DadosCadastroFeedback dados) {
        this.usuario = new Usuario(dados.usuario());
        this.tipo = dados.tipo();
        this.descricao = dados.descricao();
        this.rating = dados.rating();
        this.dataFeed = dados.dataFeed();
        this.dataCadastro = dados.dataCadastro();
        this.ativo = true;
    }

    public void atualizarInformacoes(DadosAtualizacaoFeedback dados) {

        if (dados.usuario() != null) {
            this.usuario.atualizarInformacoes(dados.usuario());
        }
        if (dados.tipo() != null) {
            this.tipo = dados.tipo();
        }
        if (dados.descricao() != null) {
            this.descricao = dados.descricao();
        }
        if (dados.rating() != null) {
            this.rating = dados.rating();
        }
        if (dados.dataFeed() != 0) {
            this.dataFeed = dados.dataFeed();
        }

    }

    public void excluir(){
        this.ativo = false;
    }
}
