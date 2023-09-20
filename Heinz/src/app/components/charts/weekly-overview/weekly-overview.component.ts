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
  SubTitle
} from 'chart.js';
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
  styleUrls: ['./weekly-overview.component.css']
})
export class WeeklyOverviewComponent {
  colorSucess = '#41f1b6';
  colorPrimary = '#7380ec';
  colorDanger = '#ff7782';

  ngOnInit() {
    const myChart = new Chart('barChart', {
      type: 'bar',
      data: {
        labels: ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta'],
        datasets: [

          {
            label: 'Environment',
            data: [100, 50, 70, 120, 100],
            backgroundColor: [this.colorSucess],
            borderWidth: 0,
            borderRadius: 20,
            barThickness: 20
          },
          {
            label: 'Social',
            data: [90, 50, 90, 120, 100],
            backgroundColor: [this.colorPrimary],
            borderWidth: 0,
            borderRadius: 20,
            barThickness: 20
          },
          {
            label: 'Governance',
            data: [20, 70, 40, 140, 120],
            backgroundColor: [this.colorDanger],
            borderWidth: 0,
            borderRadius: 20,
            barThickness: 20,
          }
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
            grid:{
              display: false
            }
          },
          y: {


            grid:{

              display: true
            }
          },
        },
        layout: {
          padding: 10,
        },
      },
    });
  }
}
