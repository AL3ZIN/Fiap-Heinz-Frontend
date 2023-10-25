package com.iab.api.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.iab.api.models.Perfil;
import com.iab.api.projections.ConsultaProjection;

@Repository
public interface PerfilRepository extends JpaRepository<Perfil, Long> {

    Perfil findByPostagem(String postagem);

    @Query("SELECT " +
            "p.id AS id, " +
            "p.perfil AS perfil, " +
            "p.postagem AS postagem, " +
            "p.legenda AS legenda, " +
            "p.canal AS canal, " +
            "COUNT(c) AS numeroComentarios, " +
            "p.dataCadastro AS dataCadastro " +
            "FROM Perfil p " +
            "LEFT JOIN p.comentarios c " +
            "GROUP BY " +
            "p.id, p.perfil, p.postagem, p.legenda, p.canal, p.dataPostagem " +
            "ORDER BY p.dataPostagem DESC")

    List<ConsultaProjection> getConsulta();

}
