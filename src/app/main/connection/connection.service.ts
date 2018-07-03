import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { User } from '../../auth/user';
import { environment } from '../../../environments/environment';

@Injectable()
export class ConnectionService {
  baseUrl = environment.apiBase + 'connections';
  
  constructor(private http: HttpClient) { }

  getConnections(): Observable<any> {
    return this.http.get<User[]>(this.baseUrl);
  }
}
