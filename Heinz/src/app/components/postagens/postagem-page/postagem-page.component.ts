import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CloudData, CloudOptions } from 'angular-tag-cloud-module';
import { AppService } from 'src/app/services/app.service';
import { ActivatedRoute } from '@angular/router';
import { WordCloud } from 'src/app/models/wordCloud';
import { ResponseWordCloud } from 'src/app/models/responseWordCloud';
import { stopWords } from 'src/app/models/stopWords';
import { AggregateData } from 'src/app/models/aggregateData';
import { Chart } from 'chart.js';
import {
  faRefresh,
  faTrash,
  faCircle,
  faFaceSmile,
  faSpinner,
  faHeart,
} from '@fortawesome/free-solid-svg-icons';
import {
  ComentarioList,
  PaginatedResponse,
} from 'src/app/models/comentarioList';

@Component({
  selector: 'app-postagem-page',
  templateUrl: './postagem-page.component.html',
  styleUrls: ['./postagem-page.component.css'],
})
export class PostagemPageComponent implements OnInit {
  constructor(private service: AppService, private route: ActivatedRoute) {}

  dados!: AggregateData;
  chart!: Chart;
  @ViewChild('chartCanvas') chartCanvas!: ElementRef;

  colorSucess = '#41f1b6';
  colorPrimary = '#7380ec';
  colorDanger = '#ff7782';
  colorDarkVariant = '#677483';

  comentarioListPR!: PaginatedResponse<ComentarioList>;
  page: number = 0;
  totalPages!: number;

  faRefresh = faRefresh;
  faTrash = faTrash;
  faCircle = faCircle;
  faFaceSmile = faFaceSmile;
  faSpinner = faSpinner;
  faHeart = faHeart;

  options: CloudOptions = {
    width: 500,
    height: 300,
    overflow: false,
    realignOnResize: true,
  };
  consultaId: ResponseWordCloud = { perfilId: 0 };

  data: CloudData[] = []; // Inicialize data como um array vazio
  listaWordCloud!: Array<WordCloud>;
  maxNumberOfWords: number = 0;
  stopWords: string[] = [];

  ngOnInit() {
    this.loadStopWords();
    this.fetchWords();
    stopWords.forEach((element) => {
      this.removeWord(element);
    });
  }

  async ngAfterViewInit(): Promise<void> {
    await this.getAggregateData();
    this.createChart();
    this.loadComentarios();
  }

  loadComentarios(): void {
    this.service
      .getComentarios(this.consultaId.perfilId, this.page) // 1 é o id_perfil de exemplo
      .subscribe((data) => {
        this.comentarioListPR = data;
        this.totalPages = data.totalPages;
        this.comentarioListPR.content.sort((a, b) => b.curtidas - a.curtidas) // Atualizando totalPages
      });
  }

  nextPage(): void {
    if(this.page < this.totalPages - 1) { // Evita avançar além da última página
      this.page++;
      this.loadComentarios();
    }
  }

  prevPage(): void {
    if(this.page > 0) { // Evita voltar antes da primeira página
      this.page--;
      this.loadComentarios();
    }
  }

  fetchWords() {
    let iframeInstagram = document.getElementById('iframeInstagram');
    this.route.params.subscribe((params) => {
      this.consultaId.perfilId = +params['id'];
      const consultaEmbedLinkId = params['embed'];
      const consultaEmbedLink =
        'https://www.instagram.com/p/' + consultaEmbedLinkId + '/embed';
      iframeInstagram!.setAttribute('src', consultaEmbedLink);
      this.service.postWordCloud(this.consultaId).subscribe((wordCloudList) => {
        this.listaWordCloud = wordCloudList.filter(
          (wordCloud) => !this.isStopWord(wordCloud.palavra)
        );
        this.listaWordCloud.sort((a, b) => b.numeroPalavras - a.numeroPalavras);
        this.listaWordCloud = this.listaWordCloud.slice(0, 20);
        this.maxNumberOfWords = 0;
        this.listaWordCloud.forEach((element) => {
          this.maxNumberOfWords += element.numeroPalavras;
        });
      });
    });
  }

  loadStopWords(): void {
    const storedStopWords = localStorage.getItem('stopWords');
    if (storedStopWords) {
      this.stopWords = JSON.parse(storedStopWords);
    } else {
      // Carregar a lista inicial de stopWords aqui.
    }
  }

  isStopWord(word: string): boolean {
    return this.stopWords.includes(word);
  }
  addWordToStopWords(word: string): void {
    this.stopWords.push(word);
    this.saveStopWords();
    this.fetchWords(); // Atualizar a lista de palavras após adicionar uma stopWord
  }
  saveStopWords(): void {
    localStorage.setItem('stopWords', JSON.stringify(this.stopWords));
  }
  removeWord(word: string): void {
    this.addWordToStopWords(word);
  }

  getWordPercentage(wordCount: number): number {
    return (wordCount / this.maxNumberOfWords) * 100;
  }

  getColor(wordCount: number): 'primary' | 'accent' | 'warn' {
    if (wordCount >= 0.75 * this.maxNumberOfWords) return 'primary';
    if (wordCount >= 0.5 * this.maxNumberOfWords) return 'accent';
    return 'warn';
  }
  excludeWord(palavra: string) {
    // Adiciona a palavra na lista de stop words
    stopWords.push(palavra);
    this.fetchWords();
  }

  getAggregateData() {
    return new Promise<void>((resolve) => {
      this.service
        .getAggregateData(this.consultaId.perfilId)
        .subscribe((dados) => {
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
            data: [this.dados.numeroNpsEnvironment * 100],
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
