package com.iab.api.dtos;

import lombok.Data;

@Data
public class WordCloudDTO {
    private String palavra;
    private int numeroPalavras;

    public WordCloudDTO(String palavra, int numeroPalavras) {
        this.palavra = palavra;
        this.numeroPalavras = numeroPalavras;
    }

}
