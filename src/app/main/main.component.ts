import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { Title } from '@angular/platform-browser';
import { environment } from '../../environments/environment';
import { User } from '../auth/user';
import { AlertService } from '../shared/alert/alert.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styles: []
})
export class MainComponent implements OnInit {
  title: string;
  titleBase: string = environment.titleBase;
  user: User = null;
  shrinked: boolean = false;
  boardsExpanded: boolean = false;
  activeLink: string = '';
  activeSubLink: string = '';
  now: number = null;

  constructor(public alertService: AlertService, public authService: AuthService, public router: Router, public activatedRoute: ActivatedRoute, public titleService: Title) {
    this.title = this.titleBase; 

    this.router.events.subscribe(e => {
      this.activeLink = '';
      this.activeSubLink = '';

      if(e instanceof NavigationEnd) {
        this.title = this.getTitle(this.router.routerState, this.router.routerState.root).join(' - ');

        this.titleService.setTitle(this.titleBase + ' | ' + this.title);
        this.shrinked = false;

        let activeUrl = this.router.url;
        let segs = activeUrl.split('/');

        this.activeLink = segs[1];
        if(this.activeLink === 'boards') {
          this.boardsExpanded = true;
        }
        else {
          this.boardsExpanded = false;
        }

        if(segs.length === 3) {
          this.activeSubLink = segs[2];
        }
      }
    });
  }

  ngOnInit() {
    this.now = Date.now();
    this.authService.getLocalUser().subscribe(
      u => {
        this.user = u;
      },
      e => {
        this.alertService.handleLocalErrors(e);
      }
    );
  }

  logout() {
    this.authService.logout();
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

  shrinker(): void {
    if(this.shrinked) {
      this.shrinked = false;
    }
    else {
      this.shrinked = true;
    }
  }

  expandBoards(): void {
    if(this.boardsExpanded) {
      this.boardsExpanded = false;
    }
    else {
      this.boardsExpanded = true;
    }
  }
}
