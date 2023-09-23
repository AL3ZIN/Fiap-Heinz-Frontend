package com.iab.api.entities;

import java.sql.Date;
import java.sql.Timestamp;

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
    private String tipo_feedback;
    private String feedback;
    private String rating;
    private String canal;
    private Date data_feedback;
    private Timestamp data_cadastro;

    public Feedback(int id_feedback, String usuario, String tipo_feedback, String feedback, String rating,
            String canal, Date data_feedback, Timestamp data_cadastro) {
        this.id_feedback = id_feedback;
        this.usuario = usuario;
        this.tipo_feedback = tipo_feedback;
        this.feedback = feedback;
        this.rating = rating;
        this.canal = canal;
        this.data_feedback = data_feedback;
        this.data_cadastro = data_cadastro;
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

    public String getTipo_feedback() {
        return tipo_feedback;
    }

    public void setTipo_feedback(String tipo_feedback) {
        this.tipo_feedback = tipo_feedback;
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

    public Date getData_feedback() {
        return data_feedback;
    }

    public void setData_feedback(Date data_feedback) {
        this.data_feedback = data_feedback;
    }

    public Timestamp getData_cadastro() {
        return data_cadastro;
    }

    public void setData_cadastro(Timestamp data_cadastro) {
        this.data_cadastro = data_cadastro;
    }

}
