package com.iab.api.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.iab.api.dtos.ComentariosAggregateDTO;
import com.iab.api.enums.Rating;
import com.iab.api.enums.Tipo;
import com.iab.api.repositories.ComentarioRepository;

@Service
public class ComentarioService {

    @Autowired
    private ComentarioRepository comentarioRepository;

    public Double calculateNPS(Tipo tipo, Long perfilId) {
        Long totalComments = comentarioRepository.countByTipoAndPerfilId(tipo, perfilId);
        Long positiveComments = comentarioRepository.countByTipoAndRatingAndPerfilId(tipo, Rating.POSITIVE, perfilId);
        System.out.println("taQjksfbjas= " + positiveComments);
        Long negativeComments = comentarioRepository.countByTipoAndRatingAndPerfilId(tipo, Rating.NEGATIVE, perfilId);

        if (totalComments == 0) return 0.0;

        return (double)(positiveComments - negativeComments) / totalComments;
    }
    
    public ComentariosAggregateDTO getAggregateData(Long perfilId) {
        ComentariosAggregateDTO dto = new ComentariosAggregateDTO();
        dto.setNumeroTipoEnvironment(comentarioRepository.countByTipoAndPerfilId(Tipo.ENVIRONMENT, perfilId));
        dto.setNumeroTipoSocial(comentarioRepository.countByTipoAndPerfilId(Tipo.SOCIAL, perfilId));
        dto.setNumeroTipoGovernance(comentarioRepository.countByTipoAndPerfilId(Tipo.GOVERNANCE, perfilId));
        dto.setNumeroTipoGeneral(comentarioRepository.countByTipoAndPerfilId(Tipo.GENERAL, perfilId));
        dto.setNumeroNpsEnvironment(calculateNPS(Tipo.ENVIRONMENT, perfilId));
        dto.setNumeroNpsSocial(calculateNPS(Tipo.SOCIAL, perfilId));
        dto.setNumeroNpsGovernance(calculateNPS(Tipo.GOVERNANCE, perfilId));
        dto.setNumeroNpsGeneral(calculateNPS(Tipo.GENERAL, perfilId));
        return dto;
    }
}
