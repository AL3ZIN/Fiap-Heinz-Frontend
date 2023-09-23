package com.iab.api.repositorio;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.iab.api.entities.Feedback;

@Repository
public interface Repositorio extends CrudRepository <Feedback,Integer>{
    
}
