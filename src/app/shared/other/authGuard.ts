import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '@app/shell/auth/auth.service';

@Injectable()
export class LoginActivate implements CanActivate {
  constructor(private router: Router, private authsrv: AuthService) {}
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this.authsrv.isLoggedOut()) {
      this.router.navigate(['/authentication/page-login'], { queryParams: { returnUrl: state.url } });
      return false;
    }
    return true;
  }
}
