import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-auth',
  template: `
  <div class="container">
    <div class="row">
      <div class="col-lg-12 text-center p-5 auth-head">
        <h1>Strava Leaderboard</h1>
      </div>
    </div>
    <router-outlet></router-outlet>
  </div>
  `,
  styles: []
})
export class AuthComponent implements OnInit {

  constructor() { }

  ngOnInit() {}

}
