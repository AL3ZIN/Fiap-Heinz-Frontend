package com.iab.api.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.iab.api.feedback.DadosAtualizacaoFeedback;
import com.iab.api.feedback.DadosCadastroFeedback;
import com.iab.api.feedback.DadosListagemFeedback;
import com.iab.api.feedback.Feedback;
import com.iab.api.feedback.FeedbackRepository;
import com.iab.api.feedback.TipoFeedback;

import jakarta.validation.Valid;
import lombok.var;

@RestController
@RequestMapping("feedback")
public class FeedbackController {

    @Autowired
    private FeedbackRepository repository;

    @PostMapping
    @Transactional
    public void cadastrar(@RequestBody @Valid DadosCadastroFeedback dados) {
        repository.save(new Feedback(dados));
    }

    @GetMapping
    public Page<DadosListagemFeedback> listar(
            @PageableDefault(size = 10, sort = { "dataCadastro" }) Pageable paginacao) {
        return repository.findAllByAtivoTrue(paginacao).map(DadosListagemFeedback::new);
    }

    @PutMapping
    @Transactional
    public void atualizar(@RequestBody @Valid DadosAtualizacaoFeedback dados) {
        var feedback = repository.getReferenceById(dados.id());
        feedback.atualizarInformacoes(dados);
    }

    @DeleteMapping("/{id}")
    @Transactional
    public void excluir(@PathVariable int id) {
        var feedback = repository.getReferenceById(id);
        feedback.excluir();
    }

     @GetMapping("/contador")
    public long contadorFeedbacks() {
       return repository.count();
    }
    @GetMapping("/contador/tipo={tipo}")
    public int contadorFeedbacksTipo(@PathVariable TipoFeedback tipo) {
       return repository.countByTipoAndAtivo(tipo, true);
    }
}