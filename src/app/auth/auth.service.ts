import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { User } from './user';
import { Router } from '@angular/router';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/delay';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable()
export class AuthService {
  isLoggedIn: boolean = false;
  redirectUrl: string;
  baseUrl = environment.apiBase + 'auth/';

  constructor(private http: HttpClient, private router: Router) { }

  authenticate(code: string): Observable<any> {
    let url = this.baseUrl + 'authenticate';
    return this.http.post<any>(url, JSON.stringify({code: code}), httpOptions);
  }

  getUserFromServer(): Observable<any> { 
    let url = this.baseUrl + 'me';

    let httpOpts = { 
      headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + this.getCurrentUserToken() })
    };

    return this.http.get<any>(url, httpOpts);
  }

  getCurrentUserToken(): string {
    let token = JSON.parse(localStorage.getItem('token'));
    return token.value;
  }

  setLocalUser(user: User): void {
    localStorage.setItem('loggedInUser', JSON.stringify(user));
  }

  getLocalUser(): BehaviorSubject<User> {
    let userData = localStorage.getItem('loggedInUser');
    let user = JSON.parse(userData);
    
    return new BehaviorSubject<User>(user);
  }

  loggedInStatusCheck(): boolean {
    let token = JSON.parse(localStorage.getItem('token'));
    if(token && token.value) { 
      return true;
    }
    return false;
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('loggedInUser');
    this.isLoggedIn = false;
    this.router.navigate(['/auth']);
  }

  refreshToken(): Observable<string> {
    let url = this.baseUrl + 'refresh'; 
    return this.http.post<string>(url, []);
  }
}
