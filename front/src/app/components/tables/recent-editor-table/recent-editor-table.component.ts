import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatTable, MatTableModule } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { AppService } from 'src/app/app.service';
import { RecentEditors } from 'src/app/interfaces/recentEditors';
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
        const data = new Date(this.listaFeedback[i].data_cadastro);
        this.listaFeedback[i].data_cadastro = format(data, 'HH:mm');
      }
    });
  }
}
