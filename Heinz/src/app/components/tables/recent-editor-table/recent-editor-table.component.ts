import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatTable } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { RecentEditorTableDataSource, RecentEditorTableItem } from './recent-editor-table-datasource';

@Component({
  selector: 'app-recent-editor-table',
  templateUrl: './recent-editor-table.component.html',
  styleUrls: ['./recent-editor-table.component.css']
})
export class RecentEditorTableComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<RecentEditorTableItem>;
  dataSource = new RecentEditorTableDataSource();

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'name'];

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }
}
