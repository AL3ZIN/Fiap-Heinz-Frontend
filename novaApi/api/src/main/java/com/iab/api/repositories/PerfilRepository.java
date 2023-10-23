package com.iab.api.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.iab.api.models.Perfil;


@Repository
public interface PerfilRepository extends JpaRepository<Perfil, Long> {

    Perfil findByPostagem(String postagem);
    
}
