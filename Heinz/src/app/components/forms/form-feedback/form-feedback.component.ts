import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { format } from 'date-fns';
import { AlertService } from 'src/app/services/alert.service';
import { Router } from '@angular/router';
import { Consulta } from 'src/app/models/consulta';
import { getFeedbacksByPostURL } from 'src/app/modules/TwitterScrap/twitterScrap';
import {
  faRefresh,
  faTrash,
  faCircle,
  faFaceSmile,
} from '@fortawesome/free-solid-svg-icons';
import {
  faFacebook,
  faTwitter,
  faInstagram,
} from '@fortawesome/free-brands-svg-icons';
import { AppService } from 'src/app/app.service';
import { async } from 'rxjs';
@Component({
  selector: 'app-form-feedback',
  templateUrl: './form-feedback.component.html',
  styleUrls: ['./form-feedback.component.css'],
})
export class FormFeedbackComponent implements OnInit {
  consulta: Array<Consulta> = [];

  faRefresh = faRefresh;
  faTrash = faTrash;
  faInstagram = faInstagram;
  faCircle = faCircle;
  faFaceSmile = faFaceSmile;

excluirPostagem(id: number): void{
    this.service.deletePostagem(id).subscribe(() =>{
      this.consulta = this.consulta.filter((consulta) => consulta.id !== id);
    })
  }

  radioValue: string = 'pesquisar'; // Inicialmente, definido como 'pesquisar'
  inputValue!: string;

  // Função para alterar o modo com base na seleção do usuário
   async handleSendClick() {
    if (this.radioValue === 'pesquisar') {
      await this.pesquisar();
    } else if (this.radioValue === 'cadastrar') {
      await this.cadastrar(this.inputValue);
    } else {
    }
  }
cadastrar(url : string): void {
    getFeedbacksByPostURL(url);
    console.log('Modo: Cadastrar');
    console.log(this.inputValue)
  }

  pesquisar(): void {
    console.log('Modo: Pesquisar');
  }
  constructor(private service: AppService) {}

  ngOnInit(): void {
    this.service.consulta().subscribe((resultData: Array<Consulta>) => {
      this.consulta = resultData.map((item) => ({
        ...item,
        dataCadastro: this.formatData(item.dataCadastro),
      }));
    });
  }

  private formatData(data: string): string {
    const date = new Date(data);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  }
  
}
