import { Component } from '@angular/core';
import { AppService } from 'src/app/app.service';
import { format } from 'date-fns';
import { ConsultingTable } from 'src/app/models/consultingTable';
import {
  faChevronLeft,
  faChevronRight
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-consulting-table',
  templateUrl: './consulting-table.component.html',
  styleUrls: ['./consulting-table.component.css'],
})
export class ConsultingTableComponent {
  faChevronLeft = faChevronLeft;
  faChevronRight = faChevronRight;

  listaFeedback!: Array<ConsultingTable>;
  test1!: string;

  pagenumber = 0;

  constructor(private service: AppService) {}

  ngAfterViewInit(): void {
    this.getConsultingTableAsync();
  }

  async getConsultingTableAsync(): Promise<void> {
    this.service.getConsultingTable(this.pagenumber).subscribe((_data) => {
      this.listaFeedback = _data;
      const dataAtual = new Date();
  
      for (let i = 0; i < this.listaFeedback.length; i++) {
        const data = new Date(this.listaFeedback[i].dataCadastro);
  
        // Extrair os componentes de data (ano, mês e dia)
        const anoData = data.getFullYear();
        const mesData = data.getMonth();
        const diaData = data.getDate();
  
        const anoAtual = dataAtual.getFullYear();
        const mesAtual = dataAtual.getMonth();
        const diaAtual = dataAtual.getDate();
  
        // Verificar se as datas têm anos, meses e dias diferentes
        if (anoData !== anoAtual || mesData !== mesAtual || diaData !== diaAtual) {
          // Se as datas estão em dias diferentes, formate para "dd/MM/yyyy"
          this.listaFeedback[i].dataCadastro = format(data, 'dd/MM/yyyy');
        } else {
          // Caso contrário, formate para "HH:mm"
          this.listaFeedback[i].dataCadastro = format(data, 'HH:mm');
        }
      }
    });
  }
  

  next() {
    this.pagenumber++;
    this.getConsultingTableAsync();
  }

  previous() {
    if (this.pagenumber > 0) {
      this.pagenumber--;
      this.getConsultingTableAsync();
    }
  }
}
