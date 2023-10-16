import { DataSource } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { map } from 'rxjs/operators';
import { Observable, of as observableOf, merge } from 'rxjs';
import { RecentEditors } from 'src/app/interfaces/recentEditors';

const EXAMPLE_DATA: RecentEditors[] = [
  {
    id_feedback: 5,
    usuario: 'ALEZIN',
    data_cadastro: '22',
    tipo: 'Environment',
    canal: 'youtube',
    rating: 'Positive',
    dataFeed: 20230912,
    feedback: 'joao',
  },
];

export class RecentEditorTableDataSource extends DataSource<RecentEditors> {
  data: RecentEditors[] = EXAMPLE_DATA;
  paginator: MatPaginator | undefined;
  sort: MatSort | undefined;

  constructor() {
    super();
  }

  connect(): Observable<RecentEditors[]> {
    if (this.paginator && this.sort) {
      return merge(
        observableOf(this.data),
        this.paginator.page,
        this.sort.sortChange
      ).pipe(
        map(() => {
          return this.getPagedData(this.data);
        })
      );
    } else {
      throw Error(
        'Please set the paginator and sort on the data source before connecting.'
      );
    }
  }

  /**
   *  Called when the table is being destroyed. Use this function, to clean up
   * any open connections or free any held resources that were set up during connect.
   */
  disconnect(): void {}

  /**
   * Paginate the data (client-side). If you're using server-side pagination,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getPagedData(data: RecentEditors[]): RecentEditors[] {
    if (this.paginator) {
      const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
      return data.splice(startIndex, this.paginator.pageSize);
    } else {
      return data;
    }
  }
}