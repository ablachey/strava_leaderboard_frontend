import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
  HttpErrorResponse,
  HttpSentEvent,
  HttpHeaderResponse,
  HttpProgressEvent,
  HttpUserEvent,
  HttpHeaders
} from '@angular/common/http';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/finally';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/take';
import { environment } from '../../environments/environment';
import { AlertService } from '../shared/alert/alert.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  isRefreshingToken: boolean = false;
  tokenSubject: BehaviorSubject<string> = new BehaviorSubject<string>(null);

  constructor(public authService: AuthService, public alertService: AlertService) { }

  addToken(req: HttpRequest<any>, token: string): HttpRequest<any> {
    let headers = new HttpHeaders({'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token });
    return req.clone({ headers: headers, responseType: 'json'});
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpSentEvent | HttpHeaderResponse | HttpProgressEvent | HttpResponse<any> | HttpUserEvent<any>> {
    
    let authorizationUrl = environment.apiBase + 'auth/authenticate';
    let syncUrl = environment.apiBase + 'activities/sync';

    if(req.url === authorizationUrl) {
      return next.handle(req);
    }
    if(req.url !== syncUrl) {
      this.alertService.loadingStart();
    }
    
    return next.handle(this.addToken(req, this.authService.getCurrentUserToken()))
      .catch(error => {
        if (error instanceof HttpErrorResponse) {
          if((<HttpErrorResponse>error).status == 401) {
            return this.handle401(req, next);
          }
          else {
            return Observable.throw(error);
          }
        } else {
          return Observable.throw(error);
        }
    });
  }

  handle401(req: HttpRequest<any>, next: HttpHandler) {
    if(!this.isRefreshingToken) {
      this.isRefreshingToken = true;

      this.tokenSubject.next(null);
      return this.authService.refreshToken()   
          .map(
            (res: any) => {
              let newToken = res.data.token;
              if(newToken) {
                this.tokenSubject.next(newToken);
                localStorage.setItem('token', JSON.stringify({value: newToken}));
                return next.handle(this.addToken(req, newToken));
              }
            }
          )
          .mergeMap(() => {
            return next.handle(this.addToken(req, this.tokenSubject.getValue()));
          })
          .catch(
            (e: any) => {
              return Observable.throw(e);
            }
          )
          .finally(
            () => {
              this.isRefreshingToken = false;
            }
          );
    } 
    else {
      return next.handle(this.addToken(req, this.tokenSubject.getValue()));
    }
  }
}
