import { Component, AfterViewInit } from '@angular/core';
import { Chart } from 'chart.js';
import { DataMonthlyOverview } from 'src/app/models/dataMonthlyOverview';
import { AppService } from 'src/app/services/app.service';

@Component({
  selector: 'app-monthly-overview',
  templateUrl: './monthly-overview.component.html',
  styleUrls: ['./monthly-overview.component.css'],
})
export class MonthlyOverviewComponent implements AfterViewInit {
  constructor(private service: AppService) {}
  dados!:DataMonthlyOverview;
  chartInstance?: Chart;

  colorSuccess = '#41f1b6';
  colorWarning = '#ffbb55';
  colorDanger = '#ff7782';
  colorSuccessFade = '#41f1b670';
  colorDangerFade = '#ff77828f';
  colorWarningFade = '#ffbb557c';

  async ngAfterViewInit(): Promise<void> {
    await this.getDataMonthOverview();
  }

  getDataMonthOverview(): Promise<void> {
    return new Promise<void>((resolve) => {
      this.service.getDataMonthlyOverview().subscribe((dados) => {
        this.dados = dados;
        console.log('Dados recebidos da API:', this.dados); // Deve mostrar os dados corretos
        this.createChart(); // Só chame isso se você tiver certeza de que os dados foram atribuídos
      });
    });
  }
  createChart() {
    const datasets = [
      {
        label: 'Positive',
        data: this.dados.positiveCount,
        borderColor: this.colorSuccess,
        backgroundColor: this.colorSuccessFade,
        fill: true,
        tension: 0.2,
      },
      {
        label: 'Neutral',
        data: this.dados.neutralCount,
        borderColor: this.colorWarning,
        backgroundColor: this.colorWarningFade,
        fill: true,
        tension: 0.2,
      },
      {
        label: 'Negative',
        data: this.dados.negativeCount,
        borderColor: this.colorDanger,
        backgroundColor: this.colorDangerFade,
        fill: true,
        tension: 0.2,
      },
    ];
    console.log(datasets);
    const myChart = new Chart('LineCharts', {
      type: 'line',
      data: {
        labels: this.dados.mes, // Use os nomes das labels aqui
        datasets: datasets,
      },
      options: {
        responsive: true,
      },
    });
  }
}
