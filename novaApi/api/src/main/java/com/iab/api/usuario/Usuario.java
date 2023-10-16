package com.iab.api.usuario;

import jakarta.persistence.Embeddable;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Embeddable
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class Usuario {

    private String nome;

    @Enumerated(EnumType.STRING)
    private Canal canal;

    public Usuario(DadosUsuario dados) {
        this.nome = dados.nome();
        this.canal = dados.canal();
    }

    public void atualizarInformacoes(DadosUsuario dados) {
        if (dados.nome() != null) {
            this.nome = dados.nome();
        }
        if (dados.canal() != null) {
            this.canal = dados.canal();
        }

    }
}
