import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Board } from '../../main/board/board';
import { environment } from '../../../environments/environment';

@Injectable()
export class ActivityService {

  baseUrl = environment.apiBase + 'activities/';
  
  constructor(private http: HttpClient) { }

  sync(): Observable<any> {
    let url = this.baseUrl + 'sync';
    return this.http.post<any>(url, []);
  }

  syncBoard(board: Board): Observable<any> {
    let url = this.baseUrl + 'sync/board/' + board.id;
    return this.http.post(url, []);
  }
}
