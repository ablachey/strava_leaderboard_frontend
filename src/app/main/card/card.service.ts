import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs/Observable';
import { FastCard } from './fast-card';
import { Activity } from '../activity/activity';
import { OverallCard } from './overall-card';

@Injectable()
export class CardService {
  baseUrl = environment.apiBase + 'boards/';

  constructor(private http: HttpClient) { }

  getFastCards(id: number | string, type: string, days: number | string): Observable<any> {
    let url = this.baseUrl + id + '/cards/?type=' + type + '&days=' + days;
    return this.http.get<FastCard>(url);
  }

  getHighCards(id: number | string, type: string, days: number | string): Observable<any> {
    let url = this.baseUrl + id + '/highest/?type=' + type + '&days=' + days;
    return this.http.get<Activity>(url);
  }

  getOverallCards(id: number | string, type: string, days: number | string): Observable<any> {
    let url = this.baseUrl + id + '/overall/?type=' + type + '&days=' + days;
    return this.http.get<OverallCard>(url);
  }
}
