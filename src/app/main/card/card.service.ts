import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs/Observable';
import { FastCard } from './fast-card';

@Injectable()
export class CardService {
  baseUrl = environment.apiBase + 'boards/';

  constructor(private http: HttpClient) { }

  getFastCards(type: string, days: number | string): Observable<any> {
    let url = this.baseUrl + '/cards/?type=' + type + '&days=' + days;
    return this.http.get<FastCard>(url);
  }
}
