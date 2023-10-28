import { Component,OnInit, AfterViewInit } from '@angular/core';
import { DataWeeklyOverview } from 'src/app/models/dataWeeklyOverview';
import {
  Chart,
  ArcElement,
  LineElement,
  BarElement,
  PointElement,
  BarController,
  BubbleController,
  DoughnutController,
  LineController,
  PieController,
  PolarAreaController,
  RadarController,
  ScatterController,
  CategoryScale,
  LinearScale,
  LogarithmicScale,
  RadialLinearScale,
  TimeScale,
  TimeSeriesScale,
  Decimation,
  Filler,
  Legend,
  Title,
  Tooltip,
  SubTitle,
} from 'chart.js';
import { AppService } from 'src/app/services/app.service';
Chart.register(
  ArcElement,
  LineElement,
  BarElement,
  PointElement,
  BarController,
  BubbleController,
  DoughnutController,
  LineController,
  PieController,
  PolarAreaController,
  RadarController,
  ScatterController,
  CategoryScale,
  LinearScale,
  LogarithmicScale,
  RadialLinearScale,
  TimeScale,
  TimeSeriesScale,
  Decimation,
  Filler,
  Legend,
  Title,
  Tooltip,
  SubTitle
);
@Component({
  selector: 'app-weekly-overview',
  templateUrl: './weekly-overview.component.html',
  styleUrls: ['./weekly-overview.component.css'],
})
export class WeeklyOverviewComponent implements OnInit, AfterViewInit {
  constructor(private service: AppService) {}

 dados!: DataWeeklyOverview;

  labels: string[] = []; // Nomes das labels

  colorSucess = '#41f1b6';
  colorPrimary = '#7380ec';
  colorDanger = '#ff7782';
  colorDarkVariant ='#677483';

  async ngOnInit() {

  }
  async ngAfterViewInit(): Promise<void> {
    await this.getDataWeeklyOverview();
    this.createChart();
}



getDataWeeklyOverview() {
  return new Promise<void>((resolve) => {
      this.service.getDataWeeklyOverview().subscribe((dados) => {
          this.dados = dados;
          resolve();
      });
  });
}
    
  createChart() {
    const myChart = new Chart('barChart', {
      type: 'bar',
      data: {
        labels: ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta'],
        datasets: [
          {
            label: 'Environment',
            data: this.dados.numeroComentariosEnvironment,
            backgroundColor: [this.colorSucess],
            borderWidth: 0,
            borderRadius: 20,
            barThickness: 15,
          },
          {
            label: 'Social',
            data: this.dados.numeroComentariosSocial,
            backgroundColor: [this.colorPrimary],
            borderWidth: 0,
            borderRadius: 20,
            barThickness: 15,
          },
          {
            label: 'Governance',
            data: this.dados.numeroComentariosGovernance,
            backgroundColor: [this.colorDanger],
            borderWidth: 0,
            borderRadius: 20,
            barThickness: 15,
          },
          {
            label: 'General',
            data: this.dados.numeroComentariosGeneral,
            backgroundColor: [this.colorDarkVariant],
            borderWidth: 0,
            borderRadius: 20,
            barThickness: 15,
          },
        ],
      },
      options: {
        plugins: {
          legend: {
            display: false,
          },
        },
        scales: {
          x: {
            grid: {
              display: false,
            },
          },
          y: {
            grid: {
              display: true,
            },
          },
        },
        layout: {
          padding: 10,
        },
      },
    });
  }
}
