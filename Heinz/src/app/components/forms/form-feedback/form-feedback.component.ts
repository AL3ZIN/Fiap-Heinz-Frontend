import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { format } from 'date-fns';
import { AlertService } from 'src/app/services/alert.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-form-feedback',
  templateUrl: './form-feedback.component.html',
  styleUrls: ['./form-feedback.component.css'],
})
export class FormFeedbackComponent {
  usuario: string = '';
  tipo_feedback: string = '';
  feedback: string = '';
  rating: string = '';
  canal: string = '';
  data_feedback: string = '';
  dataCadastro: string = '';

  constructor(
    private http: HttpClient,
    private alert: AlertService,
    private router: Router
  ) {}
  isFormActive = true; // Variável para rastrear o estado do formulário
  isTableActive = true; 
  showForm = ''; // Classe CSS para controlar o border-radius
  showTable= '';

  toggleForm() {
    this.isFormActive = !this.isFormActive; // Alterna o estado do formulário
    this.showForm = this.isFormActive ? 'active' : '';
  }
  
  toggleTable(){
    this.isTableActive = !this.isTableActive; // Alterna o estado do formulário
    this.showTable = this.isTableActive ? 'active' : '';
  }

  cadastrar() {
    const dataCadastro = new Date();
    const timestampDataCadastro = format(dataCadastro, "yyyy-MM-dd'T'HH:mm:ss");

    let BodyData = {
      usuario: this.usuario,
      tipo: this.tipo_feedback,
      feedback: this.feedback,
      rating: this.rating,
      canal: this.canal,
      dataFeed: this.data_feedback,
      dataCadastro: timestampDataCadastro,
    };

    this.http
      .post('http://localhost:8080/cadastro', BodyData, {
        responseType: 'text',
      })
      .subscribe((resultData: any) => {
        this.alert.success('Feedback Cadastrado com Sucesso!');
        // this.router.navigate(['/home']);
      });
  }
}
