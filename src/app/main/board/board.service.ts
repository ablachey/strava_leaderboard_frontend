import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs/Observable';
import { Board } from './board';

@Injectable()
export class BoardService {
  baseUrl = environment.apiBase + 'boards';

  constructor(private http: HttpClient) { }

  boards(): Observable<any> {
    return this.http.get<Board[]>(this.baseUrl);
  }
}
