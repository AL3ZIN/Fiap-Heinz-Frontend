package com.iab.api.controller;

import java.util.Arrays;
import java.util.HashMap;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.Map;
import java.util.stream.Collectors;

import com.iab.api.dtos.ComentarioListDTO;
import com.iab.api.dtos.ComentariosAggregateDTO;
import com.iab.api.dtos.ContadorDTO;
import com.iab.api.dtos.ContadorRatingDTO;
import com.iab.api.dtos.ContadorTipoDTO;
import com.iab.api.dtos.DataWeeklyOverviewDTO;
import com.iab.api.dtos.MonthlyRatingOverviewDTO;
import com.iab.api.dtos.ResponseWordCloudDTO;
import com.iab.api.dtos.WordCloudDTO;
import com.iab.api.enums.Rating;
import com.iab.api.enums.Tipo;
import com.iab.api.repositories.ComentarioRepository;
import com.iab.api.services.ComentarioListService;
import com.iab.api.services.ComentarioService;
import com.iab.api.services.DataMonthlyService;
import com.iab.api.services.DataWeeklyService;
import org.springframework.data.domain.Sort;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@RestController
@CrossOrigin
@RequestMapping("/api/comentario")
public class ComentarioController {

    @Autowired
    private ComentarioRepository comentarioRepository;

    @GetMapping("contador")
    public ContadorDTO contadorTotal() {

        long all = comentarioRepository.count();

        int contadorRatingPositive = comentarioRepository.countByRating(Rating.POSITIVE);
        int contadorRatingNeutral = comentarioRepository.countByRating(Rating.NEUTRAL);
        int contadorRatingNegative = comentarioRepository.countByRating(Rating.NEGATIVE);

        int contadorTipoEnvironment = comentarioRepository.countByTipo(Tipo.ENVIRONMENT);
        int contadorTipoSocial = comentarioRepository.countByTipo(Tipo.SOCIAL);
        int contadorTipoGovernance = comentarioRepository.countByTipo(Tipo.GOVERNANCE);
        int contadorTipoGeneral = comentarioRepository.countByTipo(Tipo.GENERAL);

        ContadorTipoDTO contadorTipo = new ContadorTipoDTO();
        contadorTipo.setEnvironment(contadorTipoEnvironment);
        contadorTipo.setSocial(contadorTipoSocial);
        contadorTipo.setGovernance(contadorTipoGovernance);
        contadorTipo.setGeneral(contadorTipoGeneral);
        contadorTipo.setPercentEnvironment((int) Math.round(((double) contadorTipoEnvironment / all) * 100));
        contadorTipo.setPercentSocial((int) Math.round(((double) contadorTipoSocial / all) * 100));
        contadorTipo.setPercentGovernance((int) Math.round(((double) contadorTipoGovernance / all) * 100));
        contadorTipo.setPercentGeneral((int) Math.round(((double) contadorTipoGeneral / all) * 100));

        ContadorRatingDTO contadorRating = new ContadorRatingDTO();
        contadorRating.setPositive(contadorRatingPositive);
        contadorRating.setNeutral(contadorRatingNeutral);
        contadorRating.setNegative(contadorRatingNegative);
        contadorRating.setPercentPositive((int) Math.round(((double) contadorRatingPositive / all) * 100));
        contadorRating.setPercentNeutral((int) Math.round(((double) contadorRatingNeutral / all) * 100));
        contadorRating.setPercentNegative((int) Math.round(((double) contadorRatingNegative / all) * 100));

        double nps = (((double) contadorRatingPositive / all) - ((double) contadorRatingNegative / all)) * 100;

        ContadorDTO contador = new ContadorDTO();
        contador.setAll(all);
        contador.setNps((int) Math.round(nps));
        contador.setRating(contadorRating);
        contador.setTipo(contadorTipo);

        return contador;
    }

    @PostMapping("wordcloud")
    public List<WordCloudDTO> getPalavras(@RequestBody ResponseWordCloudDTO perfilId) {
        Map<String, Integer> wordCount = new HashMap<>();

        List<String> listaComentarios = comentarioRepository.findComentariosByPerfil(perfilId.getPerfilId());
        for (String comentario : listaComentarios) {
            comentario = removeEmojis(comentario); // Remover emojis
            // Dividindo por espaços e pontuação, mas mantendo o '@'
            List<String> words = Arrays.asList(comentario.split("[\\s!\"#$%&'()*+,-./:;<=>?\\[\\]^_`{|}~]+"));
            for (String word : words) {
                word = word.toLowerCase(); // considerando palavras sem distinção de maiúsculas/minúsculas
                wordCount.put(word, wordCount.getOrDefault(word, 0) + 1);
            }
        }

        return wordCount.entrySet().stream()
                .sorted(Map.Entry.<String, Integer>comparingByValue().reversed()) // Ordenar pelo valor em ordem
                .map(entry -> new WordCloudDTO(entry.getKey(), entry.getValue()))
                .collect(Collectors.toList());
    }

    // Função para remover emojis
    public static String removeEmojis(String input) {
        // Regex para identificar emojis
        String regex = "[\\uD800-\\uDBFF][\\uDC00-\\uDFFF]|[^\\x00-\\x7F\\x80-\\xFF]";

        // Remove emojis da string usando regex
        return input.replaceAll(regex, "");
    }

    @Autowired
    private DataWeeklyService dataWeeklyService;

    @GetMapping("/weeklyoverview")
    public ResponseEntity<DataWeeklyOverviewDTO> getWeeklyDataOverview() {
        DataWeeklyOverviewDTO weeklyData = dataWeeklyService.getWeeklyOverview();
        return ResponseEntity.ok(weeklyData);
    }

    @Autowired
    private DataMonthlyService dataMonthlyService;

    @GetMapping("/monthlyoverview")
    public ResponseEntity<MonthlyRatingOverviewDTO> getMonthlyRatingOverview() {
        MonthlyRatingOverviewDTO overview = dataMonthlyService.getMonthlyOverview();
        return ResponseEntity.ok(overview);
    }

    @Autowired
    private ComentarioService comentarioService;

    @GetMapping("/aggregatedata/{perfilId}")
    public ComentariosAggregateDTO getAggregateData(@PathVariable Long perfilId) {
        return comentarioService.getAggregateData(perfilId);
    }

    @Autowired
    private ComentarioListService comentarioListService;

    @GetMapping("/{idPerfil}")
    public Page<ComentarioListDTO> getComentariosByPerfilId(@PathVariable int idPerfil,
            @PageableDefault(size = 10, sort = "curtidas", direction = Sort.Direction.DESC) Pageable pageable) {
        return comentarioListService.getComentariosByPerfilId(idPerfil, pageable);
    }
}
