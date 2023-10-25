package com.iab.api.models;

import java.util.Date;
import java.util.List;

import com.iab.api.enums.Canal;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Entity
@Data
public class Perfil {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    private String perfil;

    @NotBlank
    private String embedLink;

    @NotNull
    @Column(unique = true)
    private String postagem;

    private String legenda;

    @NotNull
    @Enumerated(EnumType.STRING)
    private Canal canal;

    @NotNull
    @Temporal(TemporalType.TIMESTAMP)
    private Date dataPostagem;

    @NotNull
    @Temporal(TemporalType.TIMESTAMP)
    private Date dataCadastro;

    @OneToMany(mappedBy = "perfil", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Comentario> comentarios;

}
