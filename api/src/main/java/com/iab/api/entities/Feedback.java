package com.iab.api.entities;

import java.sql.Timestamp;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Feedback {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id_feedback;
    private String usuario;

    @Column(name = "tipo_feedback")
    private String tipo;
    private String feedback;
    private String rating;
    private String canal;

    @Column(name = "data_feedback")
    private int dataFeed;
    
    @Column(name = "data_cadastro")
    private Timestamp dataCadastro;

    public Feedback(int id_feedback, String usuario, String tipo, String feedback, String rating,
            String canal, int dataFeed, Timestamp dataCadastro) {
        super();
        this.id_feedback = id_feedback;
        this.usuario = usuario;
        this.tipo = tipo;
        this.feedback = feedback;
        this.rating = rating;
        this.canal = canal;
        this.dataFeed = dataFeed;
        this.dataCadastro = dataCadastro;
    }

    public Feedback() {

    }

    public int getId_feedback() {
        return id_feedback;
    }

    public void setId_feedback(int id_feedback) {
        this.id_feedback = id_feedback;
    }

    public String getUsuario() {
        return usuario;
    }

    public void setUsuario(String usuario) {
        this.usuario = usuario;
    }

    public String getTipo() {
        return tipo;
    }

    public void setTipo(String tipo) {
        this.tipo = tipo;
    }

    public String getFeedback() {
        return feedback;
    }

    public void setFeedback(String feedback) {
        this.feedback = feedback;
    }

    public String getRating() {
        return rating;
    }

    public void setRating(String rating) {
        this.rating = rating;
    }

    public String getCanal() {
        return canal;
    }

    public void setCanal(String canal) {
        this.canal = canal;
    }

    public int getDataFeed() {
        return dataFeed;
    }

    public void setDataFeed(String dataFeed) {
        this.dataFeed =  Integer.parseInt(dataFeed.replace("-", ""));
    }

    public Timestamp getdataCadastro() {
        return dataCadastro;
    }

    public void setdataCadastro(Timestamp dataCadastro) {
        this.dataCadastro = dataCadastro;
    }

    @Override
    final public String toString() {
        return "Feedback [id_feedback=" + id_feedback + ", usuario=" + usuario + ", tipo=" + tipo + ", feedback="
                + feedback + ", rating=" + rating + ", canal=" + canal + ", dataFeed=" + dataFeed + ", dataCadastro="
                + dataCadastro + "]";
    }

}
