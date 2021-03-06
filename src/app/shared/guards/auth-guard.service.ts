import { Injectable } from '@angular/core';
import {
  CanActivate,
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';
import { AuthService } from '../../auth/auth.service';

@Injectable()
export class AuthGuardService implements CanActivate{

  constructor(private authService: AuthService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    let url: string = state.url;
    if(this.checkLogin(url)) {
      return true;
    }
    else {
      this.router.navigate(['/auth']);
    }

    return false;
  }

  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    return this.canActivate(route, state);
  }

  checkLogin(url: string): boolean {
    if(this.authService.loggedInStatusCheck()) {
      return true;
    }

    this.authService.redirectUrl = url;
    this.router.navigate(['/auth']);

    return false;
  }
}
