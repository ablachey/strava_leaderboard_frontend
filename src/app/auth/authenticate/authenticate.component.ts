import { Component, OnInit } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Title } from '@angular/platform-browser'; 

@Component({
  selector: 'app-authenticate',
  templateUrl: './authenticate.component.html',
  styles: []
})
export class AuthenticateComponent implements OnInit {

  public stravaLink: string = environment.stravaAuth;
  public authPageMsg: string = '';
  public baseTitle = environment.titleBase;

  constructor(public titleService: Title) { 
    this.titleService.setTitle(this.baseTitle + ' | Authenticate');
  }

  ngOnInit() {
    this.authPageMsg = `
      Strava Leaderboard allows you to compare your best efforts, with your friends. Compare your efforts through a set of timeframes.
      In addition, the Leaderboard allows you to maintain a ranking of the athletes who ran the furthest distance, and the longest run.
    `;
  }

}
