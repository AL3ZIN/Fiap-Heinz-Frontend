package com.iab.api.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
// import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.iab.api.entities.Feedback;
import com.iab.api.repositorio.Repositorio;


@RestController

public class ProductController {

    @Autowired
    private Repositorio acao;

    @PostMapping("/api")
    public Feedback cadastro(@RequestBody Feedback obj){
        return acao.save(obj);
    }
}