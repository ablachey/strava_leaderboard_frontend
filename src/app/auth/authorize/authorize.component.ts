import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService } from '../../shared/alert/alert.service';
import { AuthService } from '../auth.service';
import { User } from '../user';
import { environment } from '../../../environments/environment';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-authorize',
  templateUrl: './authorize.component.html',
  styles: []
})
export class AuthorizeComponent implements OnInit {
  public baseTitle = environment.titleBase;

  constructor(public activatedRoute: ActivatedRoute, public alertService: AlertService, public authService: AuthService, public router: Router, public titleService: Title) { 
    this.titleService.setTitle(this.baseTitle + ' | Authorize');

    this.activatedRoute.queryParams.subscribe(
      params => {
        let code = params['code'];
        if(!code || code === '') {
          this.alertService.addDangerMessage('Invalid Code');
        }
        else {
          this.authorize(code);
        }
      },
      e => {
        this.alertService.addDangerMessage('Invalid Code');
      }
    )
  }

  ngOnInit() {
  }

  authorize(code: string) {
    this.authService.authenticate(code).subscribe(
      (res: any) => {
        let token = res.data.token;
        if(token) {
          localStorage.setItem('token', JSON.stringify({value: token}));
          this.authService.isLoggedIn = true;
          this.alertService.clear();
        }

        this.authService.getUserFromServer().subscribe(
          userData => {
            let user = userData.data as User;
            this.authService.setLocalUser(user);

            if(this.authService.isLoggedIn) {
              let redirect = this.authService.redirectUrl ? this.authService.redirectUrl : 'dashboard';

              this.router.navigate([redirect]);
              this.alertService.clear();
            }
          },
          err => {
            this.alertService.handleErrors(err);
          }
        );
      },
      e => {
        this.alertService.handleErrors(e);
      }
    );
  }
}
