import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

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
  data_cadastro: string = '';

  constructor(private http: HttpClient) {}

  cadastrar() {
    let BodyData = {
      usuario: this.usuario,
      tipo: this.tipo_feedback,
      feedback: this.feedback,
      rating: this.rating,
      canal: this.canal,
      dataFeed: this.data_feedback,
      data_cadastro: this.data_cadastro,
    };

    this.http
      .post('http://localhost:8080/cadastro', BodyData, { responseType: 'text' })
      .subscribe((resultData: any) => {
        console.log(resultData);
        alert('Successfully');
      });
  }
}
