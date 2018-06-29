import { Component, OnInit } from '@angular/core';
import { PrService } from './pr.service';
import { AlertService } from '../../shared/alert/alert.service';
import { AuthService } from '../../auth/auth.service';
import { ActivatedRoute } from '@angular/router';
import { ProfileService } from '../profile/profile.service';
import { User } from '../../auth/user';
import { Pr } from './pr';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-pr',
  templateUrl: './pr.component.html',
  styles: []
})
export class PrComponent implements OnInit {
  userId: number = null;
  user: User = null;
  isActiveUser: boolean = false;
  prs: Pr[] = [];
  stravaActivityUrl: string = environment.stravaActivityUrl;

  constructor(public prService: PrService, public alertService: AlertService, public authService: AuthService, public route: ActivatedRoute, public profileService: ProfileService) { }

  ngOnInit() {
    this.userId = this.route.snapshot.params.id;

    if(!this.userId) {
      this.isActiveUser = true;
      this.authService.getLocalUser().subscribe(
        u => {
          this.user = u;
          this.userId = this.user.id;
          this.loadPrs();
        },
        e => {
          this.alertService.handleLocalErrors(e);
        }
      );
    }

    if(!this.user) {
      this.profileService.getUser(this.userId).subscribe(
        res => {
          this.user = res.data as User;
          this.alertService.loadingStop();
          this.loadPrs();
        },
        e => {
          this.alertService.handleErrors(e);
          this.alertService.loadingStop();
        }
      )
    }
  }

  loadPrs(): void {
    this.prService.getPrs(this.userId).subscribe(
      res => {
        this.prs = res.data as Pr[];
        this.alertService.loadingStop();
      },
      e => {
        this.alertService.handleErrors(e);
        this.alertService.loadingStop();
      }
    );
  }
}
