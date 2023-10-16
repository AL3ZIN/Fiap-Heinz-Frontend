import { AfterViewInit, Component} from '@angular/core';
import { AppService } from 'src/app/app.service';
import { RecentEditors } from 'src/app/models/recentEditors';
import { format } from 'date-fns';

@Component({
  selector: 'app-recent-editor-table',
  templateUrl: './recent-editor-table.component.html',
  styleUrls: ['./recent-editor-table.component.css'],
})
export class RecentEditorTableComponent implements AfterViewInit {
  listaFeedback!: Array<RecentEditors>;
  test1!: string;

  constructor(private service: AppService) {}

  ngAfterViewInit(): void {
    this.getTableRecentEditorAsync();
  }

  async getTableRecentEditorAsync(): Promise<void> {
    this.service.getTableRecentEditor().subscribe((_data) => {
      this.listaFeedback = _data;
      for (let i = 0; i < this.listaFeedback.length; i++) {
        const data = new Date(this.listaFeedback[i].dataCadastro);
        this.listaFeedback[i].dataCadastro = format(data, 'HH:mm');
        console.log(this.listaFeedback[i].dataCadastro)
      }

      console.log(this.listaFeedback);
    });
  }
}
