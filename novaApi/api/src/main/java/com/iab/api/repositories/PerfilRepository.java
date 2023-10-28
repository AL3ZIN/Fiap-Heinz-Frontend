package com.iab.api.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.iab.api.models.Perfil;
import com.iab.api.projections.ConsultaProjection;

@Repository
public interface PerfilRepository extends JpaRepository<Perfil, Long> {

    Perfil findByPostagemLink(String postagemLink);



      @Query("SELECT " +
            "p.id AS id, " +
            "p.perfil AS perfil, " +
            "p.postagemLink AS postagemLink, " +
            "p.embedLink AS embedLink, " +
            "p.legenda AS legenda, " +
            "p.canal AS canal, " +
            "COUNT(c) AS numeroComentarios, " +
            "((SUM(CASE WHEN c.rating = 'POSITIVE' THEN 1 ELSE 0 END) / COUNT(c.rating)) - " +
            "(SUM(CASE WHEN c.rating = 'NEGATIVE' THEN 1 ELSE 0 END) / COUNT(c.rating))) * 100 AS nps, " +
            "p.dataCadastro AS dataCadastro " +
            "FROM Perfil p " +
            "LEFT JOIN p.comentarios c " +
            "GROUP BY " +
            "p.id, p.perfil, p.postagemLink, p.legenda, p.canal, p.dataCadastro, p.dataPostagem " +
            "ORDER BY p.dataCadastro DESC")
    List<ConsultaProjection> getConsulta();

    @Query("SELECT " +
            "p.id AS id, " +
            "p.perfil AS perfil, " +
            "p.postagemLink AS postagemLink, " +
            "p.embedLink AS embedLink, " +
            "p.legenda AS legenda, " +
            "p.canal AS canal, " +
            "COUNT(c) AS numeroComentarios, " +
            "((SUM(CASE WHEN c.rating = 'POSITIVE' THEN 1 ELSE 0 END) / COUNT(c.rating)) - " +
            "(SUM(CASE WHEN c.rating = 'NEGATIVE' THEN 1 ELSE 0 END) / COUNT(c.rating))) * 100 AS nps, " +
            "p.dataCadastro AS dataCadastro " +
            "FROM Perfil p " +
            "LEFT JOIN p.comentarios c " +
            "WHERE p.postagemLink = :postagemLink " +
            "GROUP BY " +
            "p.id, p.perfil, p.postagemLink, p.embedLink, p.legenda, p.canal, p.dataCadastro, p.dataPostagem " +
            "ORDER BY p.dataCadastro DESC")
    List<ConsultaProjection> getConsultaByPostagemLink(@Param("postagemLink")String postagemLink);

  
}
