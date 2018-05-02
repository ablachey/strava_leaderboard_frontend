import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs/Observable';
import { Board } from './board';
import { BoardSearch } from './board-search';

@Injectable()
export class BoardService {
  baseUrl = environment.apiBase + 'boards/';

  constructor(private http: HttpClient) { }

  getBoards(): Observable<any> {
    return this.http.get<Board[]>(this.baseUrl);
  }

  getBoard(id: number | string): Observable<any> {
    let url = this.baseUrl + id;
    return this.http.get<Board>(url);
  }

  searchBoards(keyword: string): Observable<any> {
    let url = this.baseUrl + 'search';
    return this.http.post<BoardSearch[]>(url, JSON.stringify({keyword: keyword}));
  }

  joinBoard(id: number): Observable<any> {
    let url = this.baseUrl + id + '/join';
    return this.http.post<any>(url, []);
  }

  joinBoardApprove(boardId: number, userId: number): Observable<any> {
    let url = this.baseUrl + boardId + '/join/' + userId + '/approve';
    return this.http.post<any>(url, []);
  }

  addBoard(name: string): Observable<any> {
    return this.http.post<any>(this.baseUrl, JSON.stringify({name: name}));
  }

  deleteBoard(board: Board): Observable<any> {
    let url = this.baseUrl + board.id;
    return this.http.delete<any>(url);
  }
}
