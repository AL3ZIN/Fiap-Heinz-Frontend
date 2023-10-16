import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RecentEditors } from './models/recentEditors';
import { ConsultingTable } from './models/consultingTable';
import { ConsultingTableComponent } from './components/tables/consulting-table/consulting-table.component';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  private apiUrl = 'http://localhost:8080';
  constructor(private http: HttpClient) {}

  getTotalFeedbacks() {
    return this.http.get('http://localhost:8080/contador/total');
  }

  getNumTipoEnvironment() {
    return this.http.get(
      'http://localhost:8080/contador/tipofeedback/Environment'
    );
  }

  getNumTipoSocial() {
    return this.http.get('http://localhost:8080/contador/tipofeedback/Social');
  }

  getNumTipoGovernance() {
    return this.http.get(
      'http://localhost:8080/contador/tipofeedback/Governance'
    );
  }

  getNumRating(): Observable<Array<number>> {
    return this.http.get<Array<number>>(
      'http://localhost:8080/contador/rating'
    );
  }

  getNotaNPS() {
    return this.http.get('http://localhost:8080/math/nps');
  }

  getGraphRatingLabels() {
    return this.http.get<string[]>('http://localhost:8080/graph/rating/labels');
  }
  getGraphRatingData() {
    return this.http.get<Array<number[]>>(
      'http://localhost:8080/graph/rating/data'
    );
  }
  getGraphTipoData(): Observable<Array<number[]>> {
    return this.http.get<Array<number[]>>(
      'http://localhost:8080/graph/tipo/data'
    );
  }
  getProgressBar(): Observable<Array<number>> {
    return this.http.get<Array<number>>(
      'http://localhost:8080/math/progressbar'
    );
  }

  getTableRecentEditor(): Observable<Array<RecentEditors>> {
    return this.http.get<Array<RecentEditors>>(
      'http://localhost:8080/find/top/datafeed'
    );
  }

  getRankingCanal(): Observable<Array<string>> {
    return this.http.get<Array<string>>(
      'http://localhost:8080/contador/ranking'
    );
  }

  getConsultingTable(page: number): Observable<any> {
    const url = `${this.apiUrl}/find/all/page=${page}`;
    return this.http.get(url);
  }
}
