import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Pr } from './pr';
import { environment } from '../../../environments/environment';

@Injectable()
export class PrService {
  baseUrl = environment.apiBase + 'prs/';

  constructor(private http: HttpClient) { }

  getPrs(id: number | string): Observable<any> {
    let url = this.baseUrl + id;
    return this.http.get<Pr[]>(url);
  }
}
