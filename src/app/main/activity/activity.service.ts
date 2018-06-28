import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Activity } from './activity';
import { environment } from '../../../environments/environment';

@Injectable()
export class ActivityService {
  baseUrl = environment.apiBase + 'activities/recent';

  constructor(private http: HttpClient) { }

  getRecent(): Observable<any> {
    return this.http.get<Activity[]>(this.baseUrl);
  }
}
