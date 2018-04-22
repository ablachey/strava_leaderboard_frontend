import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { Title } from '@angular/platform-browser';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styles: []
})
export class MainComponent implements OnInit {
  public title: string;
  public titleBase: string = environment.titleBase;

  constructor(public authService: AuthService, public router: Router, public activatedRoute: ActivatedRoute, public titleService: Title) {
    this.title = this.titleBase; 

    this.router.events.subscribe(e => {
      if(e instanceof NavigationEnd) {
        this.title = this.getTitle(this.router.routerState, this.router.routerState.root).join(' - ');

        this.titleService.setTitle(this.titleBase + ' | ' + this.title);
      }
    });
  }

  ngOnInit() {

  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/auth']);
  }

  getTitle(state, parent) {
    var data = [];
    if(parent && parent.snapshot.data && parent.snapshot.data.title) {
      data.push(parent.snapshot.data.title);
    }

    if(state && parent) {
      data.push(... this.getTitle(state, state.firstChild(parent)));
    }
    return data;
  }
}
