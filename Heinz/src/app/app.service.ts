import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AppService {
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
    return this.http.get('http://localhost:8080/contador/tipofeedback/Governance');
  }

  getNumRatingPositive() {
    return this.http.get('http://localhost:8080/contador/rating/Positive');
  }

  getNumRatingNeutral() {
    return this.http.get('http://localhost:8080/contador/rating/Neutral');
  }

  getNumRatingNegative() {
    return this.http.get('http://localhost:8080/contador/rating/Negative');
  }

  getNotaNPS(){
    return this.http.get('http://localhost:8080/math/nps')
  }
  
  getGraphPositive(){
    return this.http.get('http://localhost:8080/graph/positive')
  }
  
}
