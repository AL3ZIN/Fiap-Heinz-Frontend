import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RecentEditors } from '../models/recentEditors';
import { ConsultingTable } from '../models/consultingTable';
import { ConsultingTableComponent } from '../components/tables/consulting-table/consulting-table.component';
import { Consulta } from '../models/consulta';
import { Contador } from '../models/contador';
import { Postagem } from '../models/postagem';
import { BehaviorSubject } from 'rxjs';
import { WordCloud } from '../models/wordCloud';
import { ResponseWordCloud } from '../models/responseWordCloud';
import { DataWeeklyOverview } from '../models/dataWeeklyOverview';
import { DataMonthlyOverview } from '../models/dataMonthlyOverview';
import { AggregateData } from '../models/aggregateData';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  private consultaSubject = new BehaviorSubject<Array<Consulta>>([]);
  consulta$ = this.consultaSubject.asObservable();

  // ...

  updateConsulta(consultas: Array<Consulta>) {
    this.consultaSubject.next(consultas);
  }
  private apiUrl = 'http://localhost:8080';
  constructor(private http: HttpClient) {}

  contador(): Observable<Contador> {
    return this.http.get<Contador>(
      'http://localhost:8080/api/comentario/contador'
    );
  }

  consulta(postagemLink: string): Observable<Array<Consulta>> {
    return this.http.get<Array<Consulta>>(
      `http://localhost:8080/api/postagem/consulta?postagemLink=${postagemLink}`
    );
  }

  deletePostagem(id: number): Observable<void> {
    return this.http.delete<void>(
      `http://localhost:8080/api/postagem/excluir/${id}`
    );
  }

  getPostagem(instagramUrl: string): Observable<Postagem> {
    const postagem = this.http.get<Postagem>(
      `http://localhost:3000/api/instagram/${instagramUrl}`
    );
    return postagem;
  }

  postCadastrarPostagem(postagem: Postagem): Observable<Postagem> {
    return this.http.post<Postagem>(
      'http://localhost:8080/api/postagem/save',
      postagem
    );
  }

  updatePostagem(postagem: Postagem) {
    return this.http.put<Postagem>(
      'http://localhost:8080/api/postagem/update',
      postagem
    );
  }

  postWordCloud(perfilId: ResponseWordCloud): Observable<Array<WordCloud>> {
    return this.http.post<Array<WordCloud>>(
      'http://localhost:8080/api/comentario/wordcloud',
      perfilId
    );
  }

  getDataWeeklyOverview(): Observable<DataWeeklyOverview> {
    return this.http.get<DataWeeklyOverview>(
      'http://localhost:8080/api/comentario/weeklyoverview'
    );
  }

  getDataMonthlyOverview(): Observable<DataMonthlyOverview> {
    return this.http.get<DataMonthlyOverview>(
      'http://localhost:8080/api/comentario/monthlyoverview'
    );
  }
  getAggregateData(id:number): Observable<AggregateData> {
    return this.http.get<AggregateData>(
      `http://localhost:8080/api/comentario/aggregateData/${id}`
    );
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
