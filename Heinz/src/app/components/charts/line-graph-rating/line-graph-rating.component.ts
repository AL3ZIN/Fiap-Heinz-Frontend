import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Chart, LineController, CategoryScale, Title, Tooltip } from 'chart.js';
import { AppService } from 'src/app/app.service';

Chart.register(LineController, CategoryScale, Title, Tooltip);

@Component({
  selector: 'app-line-graph-rating',
  templateUrl: './line-graph-rating.component.html',
  styleUrls: ['./line-graph-rating.component.css'],
})
export class LineGraphRatingComponent  {
  // dados: Array<number[]> = [];
  // positiveData: number[] = [];
  // neutralData: number[] = [];
  // negativeData: number[] = [];

  // labels: string[] = []; // Nomes das labels

  // // Variáveis de cores
  // colorSuccess = '#41f1b6';
  // colorWarning = '#ffbb55';
  // colorDanger = '#ff7782';
  // colorSuccessFade = '#41f1b670';
  // colorDangerFade = '#ff77828f';
  // colorWarningFade = '#ffbb557c';

  // constructor(private service: AppService, private http: HttpClient) {}

  // ngOnInit() {
  //   // Primeira requisição para obter os dados numéricos
  //   this.service.getGraphRatingData().subscribe(
  //     (result) => {
  //       this.dados = result;
  //       this.extractData();

  //       // Após obter os dados numéricos, faça a segunda requisição para obter os nomes das labels
  //       this.service.getGraphRatingLabels().subscribe(
  //         (labelResult: string[]) => {
  //           this.labels = labelResult; // Armazena os nomes das labels

  //           // Agora que você tem os dados e as labels, pode usá-los no gráfico
  //           this.createChart();
  //         },
          
  //       );
  //     }
  //   );
  // }

  // extractData() {
  //   if (this.dados.length >= 3) {
  //     this.positiveData = this.dados[0];
  //     this.neutralData = this.dados[1];
  //     this.negativeData = this.dados[2];
  //   }
  // }

  // createChart() {
  //   const datasets = [
  //     {
  //       label: 'Positive',
  //       data: this.positiveData,
  //       borderColor: this.colorSuccess,
  //       backgroundColor: this.colorSuccessFade,
  //       fill: true,
  //       tension: 0.2,
  //     },
  //     {
  //       label: 'Neutral',
  //       data: this.neutralData, 
  //       borderColor: this.colorWarning,
  //       backgroundColor: this.colorWarningFade,
  //       fill: true,
  //       tension: 0.2,
  //     },
  //     {
  //       label: 'Negative',
  //       data: this.negativeData,
  //       borderColor: this.colorDanger,
  //       backgroundColor: this.colorDangerFade,
  //       fill: true,
  //       tension: 0.2,
  //     },
  //   ];

  //   const myChart = new Chart('LineChart', {
  //     type: 'line',
  //     data: {
  //       labels: this.labels, // Use os nomes das labels aqui
  //       datasets: datasets,
  //     },
  //     options: {
  //       responsive: true,
  //     },
  //   });
  // }
}
