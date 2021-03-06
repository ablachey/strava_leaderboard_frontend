import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../../environments/environment';

@Injectable()
export class AnnualService {
  baseUrl = environment.apiBase + 'annual/';

  constructor(private http: HttpClient) { }

  getTopStats(): Observable<any> {
    let url = this.baseUrl + 'stats';
    return this.http.get<any>(url);
  }

  getDistanceData(): Observable<any> {
    let url = this.baseUrl + 'distances';
    return this.http.get<any>(url);
  }

  getBubbleData(): Observable<any> {
    let url = this.baseUrl + 'bubble';
    return this.http.get<any>(url);
  }
}
