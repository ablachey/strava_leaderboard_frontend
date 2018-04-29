import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../../environments/environment';
import { User } from '../../auth/user';

@Injectable()
export class ProfileService {
  baseUrl = environment.apiBase + 'profile/';
  constructor(private http: HttpClient) { }

  getUser(id: number): Observable<any> {
    let url = this.baseUrl + id;
    return this.http.get<User>(url);
  }

  getAccumulated(id: number): Observable<any> {
    let url = this.baseUrl + id + '/accumulated';
    return this.http.get<any>(url);
  }

  getMonth(id: number, type: string): Observable<any> {
    let url = this.baseUrl + id + '/month?type=' + type;
    return this.http.get<any>(url);
  }

  getEfforts(id: number, type: string): Observable<any> {
    let url = this.baseUrl + id + '/efforts?type=' + type;
    return this.http.get<any>(url);
  }
}
