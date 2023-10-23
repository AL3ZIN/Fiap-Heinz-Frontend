package com.iab.api.models;

import lombok.Data;

import java.util.Date;

import com.iab.api.enums.Rating;
import com.iab.api.enums.Tipo;

import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

@Entity
@Data
public class Comentario {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    private String usuario;

    @NotBlank
    private String comentario;

    @NotNull
    private int curtidas;

    @NotNull
    @Enumerated(EnumType.STRING)
    private Tipo tipo;

    @NotNull
    @Enumerated(EnumType.STRING)
    private Rating rating;

    @NotNull
    @Temporal(TemporalType.TIMESTAMP)
    private Date dataFeed;

    @NotNull
    @Temporal(TemporalType.TIMESTAMP)
    private Date dataCadastro;

    @ManyToOne
    @JoinColumn(name = "perfil_id")
    private Perfil perfil;

}
