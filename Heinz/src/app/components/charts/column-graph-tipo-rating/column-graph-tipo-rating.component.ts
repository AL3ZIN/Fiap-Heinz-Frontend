import { Component, ElementRef, OnInit, AfterViewInit } from '@angular/core';
import { Chart } from 'chart.js';
import { ViewChild } from '@angular/core';
import { AggregateData } from 'src/app/models/aggregateData';
import { AppService } from 'src/app/services/app.service';

@Component({
  selector: 'app-column-graph-tipo-rating',
  templateUrl: './column-graph-tipo-rating.component.html',
  styleUrls: ['./column-graph-tipo-rating.component.css'],
})
export class ColumnGraphTipoRatingComponent implements OnInit, AfterViewInit {
  @ViewChild('chartCanvas') chartCanvas!: ElementRef;
  chart!: Chart;

  dados!: AggregateData;

  colorSucess = '#41f1b6';
  colorPrimary = '#7380ec';
  colorDanger = '#ff7782';
  colorDarkVariant = '#677483';

  constructor(private service: AppService) {}

  ngOnInit(): void {}

  async ngAfterViewInit(): Promise<void> {
    await this.getAggregateData();
    this.createChart();
  }

  getAggregateData() {
    return new Promise<void>((resolve) => {
      this.service.getAggregateData(101).subscribe((dados) => {
        this.dados = dados;
        console.log(dados);
        resolve();
      });
    });
  }

  createChart() {
    if (this.chart) {
      this.chart.destroy(); // Destroy the previous chart instance
    }

    this.chart = new Chart(this.chartCanvas.nativeElement, {
      type: 'bar',
      data: {
        labels: ['NPS'], // Adjusted to represent Tipo and NPS
        datasets: [
          {
            label: 'Environment',
            data: [ this.dados.numeroNpsEnvironment * 100],
            backgroundColor: [this.colorSucess],
            borderWidth: 0,
            borderRadius: 0,
            barThickness: 30,
          },
          {
            label: 'Social',
            data: [this.dados.numeroNpsSocial * 100],
            backgroundColor: [this.colorPrimary],
            borderWidth: 0,
            borderRadius: 0,
            barThickness: 30,
          },
          {
            label: 'Governance',
            data: [this.dados.numeroNpsGovernance * 100],
            backgroundColor: [this.colorDanger],
            borderWidth: 0,
            borderRadius: 0,
            barThickness: 30,
          },
          {
            label: 'General',
            data: [this.dados.numeroNpsGeneral * 100],
            backgroundColor: [this.colorDarkVariant],
            borderWidth: 0,
            borderRadius: 0,
            barThickness: 30,
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
