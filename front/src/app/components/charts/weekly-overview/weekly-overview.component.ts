import { Component } from '@angular/core';
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
import { AppService } from 'src/app/app.service';
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
export class WeeklyOverviewComponent {
  constructor(private service: AppService) {}

  dados: Array<number[]> = [];
  EnvironmentData: number[] = [];
  SocialData: number[] = [];
  GovernaceData: number[] = [];

  labels: string[] = []; // Nomes das labels

  colorSucess = '#41f1b6';
  colorPrimary = '#7380ec';
  colorDanger = '#ff7782';

  async ngOnInit() {
    await this.getGraphTipoDataAsync()
  }
  async getGraphTipoDataAsync() {
    this.service.getGraphTipoData().subscribe((result) => {
      this.dados = result;
      this.extractData();
      this.createChart();
    });
  }
  extractData() {
    if (this.dados.length >= 3) {
      this.EnvironmentData = this.dados[0];
      this.SocialData = this.dados[1];
      this.GovernaceData = this.dados[2];
    }
  }
  createChart() {
    const myChart = new Chart('barChart', {
      type: 'bar',
      data: {
        labels: ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta'],
        datasets: [
          {
            label: 'Environment',
            data: this.EnvironmentData,
            backgroundColor: [this.colorSucess],
            borderWidth: 0,
            borderRadius: 20,
            barThickness: 20,
          },
          {
            label: 'Social',
            data: this.SocialData,
            backgroundColor: [this.colorPrimary],
            borderWidth: 0,
            borderRadius: 20,
            barThickness: 20,
          },
          {
            label: 'Governance',
            data: this.GovernaceData,
            backgroundColor: [this.colorDanger],
            borderWidth: 0,
            borderRadius: 20,
            barThickness: 20,
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
