package com.iab.api.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.iab.api.dtos.ContadorDTO;
import com.iab.api.dtos.ContadorRatingDTO;
import com.iab.api.dtos.ContadorTipoDTO;
import com.iab.api.enums.Rating;
import com.iab.api.enums.Tipo;
import com.iab.api.repositories.ComentarioRepository;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;

@RestController
@RequestMapping("/api/comentario")
public class ComentarioController {
    @Autowired
    private ComentarioRepository comentarioRepository;

    @CrossOrigin
    @GetMapping("contador")
    public ContadorDTO contadorTotal() {

        long all = comentarioRepository.count();

        int contadorRatingPositive = comentarioRepository.countByRating(Rating.POSITIVE);
        int contadorRatingNeutral = comentarioRepository.countByRating(Rating.NEUTRAL);
        int contadorRatingNegative = comentarioRepository.countByRating(Rating.NEGATIVE);

        ContadorTipoDTO contadorTipo = new ContadorTipoDTO();
        contadorTipo.setEnvironment(comentarioRepository.countByTipo(Tipo.ENVIRONMENT));
        contadorTipo.setSocial(comentarioRepository.countByTipo(Tipo.SOCIAL));
        contadorTipo.setGovernance(comentarioRepository.countByTipo(Tipo.GOVERNANCE));
        contadorTipo.setGeneral(comentarioRepository.countByTipo(Tipo.GENERAL));

        ContadorRatingDTO contadorRating = new ContadorRatingDTO();
        contadorRating.setPositive(contadorRatingPositive);
        contadorRating.setNeutral(contadorRatingNeutral);
        contadorRating.setNegative(contadorRatingNegative);

        double nps = (((double) contadorRatingPositive / all) - ((double) contadorRatingNegative / all)) * 100;

        ContadorDTO contador = new ContadorDTO();
        contador.setAll(all);
        contador.setNps((int) Math.round(nps));
        contador.setRating(contadorRating);
        contador.setTipo(contadorTipo);

        return contador;
    }

}
