package com.iab.api.repositorio;


import java.util.List;

import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.iab.api.entities.Feedback;

@Repository
public interface Repositorio extends CrudRepository <Feedback,Integer>{

    
    int countByTipo(String tipoFeedback);

    int countByRating(String rating);

    int countByDataFeed(int dataFeedAntes);

    int countByCanal(String canal);

    int countByDataFeedBetweenAndRating(int dataFeedAntes, int dataFeedDepois, String rating);

    int countByDataFeedAndTipo(int datadds, String tipo);

    @Query("SELECT f FROM Feedback f ORDER BY f.dataCadastro DESC LIMIT 6")
    List<Feedback> findTop6OrderByDataCadastroDesc();

    List<Feedback> findAll(Pageable pageable);


}
