package com.iab.api.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.iab.api.models.Comentario;
import com.iab.api.models.Perfil;
import com.iab.api.projections.RankingProjection;
import com.iab.api.enums.Rating;
import com.iab.api.enums.Tipo;

@Repository
public interface ComentarioRepository extends JpaRepository<Comentario, Long> {

    List<Comentario> findByPerfil(Perfil perfil);

    int countByTipo(Tipo tipo);

    int countByRating(Rating rating);

    void deleteByPerfil(Perfil perfil);

    @Query("SELECT p.canal AS canal," +
            "COUNT(c) AS qtdComentarios " +
            "FROM Comentario c " +
            "JOIN c.perfil p " +
            "GROUP BY p.canal ORDER BY p.dataPostagem")
    List<RankingProjection> findRankingCanais();
    
}
