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
  selector: 'app-line-graph-rating',
  templateUrl: './line-graph-rating.component.html',
  styleUrls: ['./line-graph-rating.component.css'],
})
export class LineGraphRatingComponent {
  colorSuccess = '#41f1b6';
   colorWarning = '#ffbb55';
  colorDanger = '#ff7782';
  colorSuccessFade = '#41f1b670';
  colorDangerFade ='#ff77828f';
  colorWarningFade = '#ffbb557c';

  ngOnInit() {
    const myChart = new Chart('LineChart', {
      type: 'line',
      data: {
        
        labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai'],
        datasets: [
          {
            label: 'Positive',
            data: [100, 50, 70, 120, 100],
            borderColor: this.colorSuccess,
            backgroundColor: this.colorSuccessFade,
            fill: true,
            tension: 0.4
          },
          {
            label: 'Neutral',
            data: [10, 65, 32, 140, 97],
            borderColor: this.colorWarning,
            backgroundColor: this.colorWarningFade,
            fill: true,
            tension: 0.4
          },
          {
            label: 'Negative',
            data: [34, 125, 72, 40, 26],
            borderColor: this.colorDangerFade,
            backgroundColor: this.colorDangerFade,
            fill: true,
            tension: 0.4,
          },
        ]},
        options: {
          responsive: true
        },
        


    });

  }
}