import { Injectable, Inject } from '@Angular/core';
import { HttpClient } from '@angular/common/http';
import * as moment from 'moment';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AppPermission, User } from '../models/user.model';
import { DataResponse } from '../models/data-response.model';
import { Token, Auth } from '../models/auth.model';
import { AppSetting } from '../models/appsetting.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(@Inject(HttpClient) private http: HttpClient) {}
  login(auth: Auth) {
    return this.http
      .post<Token>('auth/login', auth)
      .pipe(
        map(res => {
          this.setSession(res);
        })
      )
      .pipe(switchMap(() => this.fetchAppsettings()));
  }
  fetchpermission(username: string): Observable<AppPermission[]> {
    return this.http.get<DataResponse>('user/' + username + '/permissions').pipe(
      map((res: DataResponse) => {
        if (res.code === 0) {
          console.error(res);
          return;
        }
        const permissions: AppPermission[] = res.data.permissions;
        this.setSysUserData(res.data);
        this.setPermissions(permissions);
        return permissions;
      })
    );
  }
  getPermissions(): AppPermission[] {
    if (localStorage.getItem('apppermission')) {
      return JSON.parse(localStorage.getItem('apppermission'));
    }
    return null;
  }
  public getSysUserData(): User {
    return JSON.parse(localStorage.getItem('sysuserdata'));
  }
  private setSysUserData(user: User) {
    localStorage.removeItem('sysuserdata');
    localStorage.setItem('sysuserdata', JSON.stringify(user));
  }
  private setPermissions(permissions: AppPermission[]) {
    localStorage.removeItem('apppermission');
    localStorage.setItem('apppermission', JSON.stringify(permissions));
  }
  private setAppsettings(settings: AppSetting[]) {
    localStorage.removeItem('appsettings');
    localStorage.setItem('appsettings', JSON.stringify(settings));
  }
  public getAppsettings(): AppSetting[] {
    return JSON.parse(localStorage.getItem('appsettings'));
  }
  private fetchAppsettings(): Observable<AppSetting[]> {
    return this.http.get<DataResponse>('general/settings').pipe(
      map((res: DataResponse) => {
        this.setAppsettings(res.data);
        return res.data;
        // return JSON.parse(res.data);
      })
    );
  }
  private setSession(authResult: Token) {
    const expiresAt = moment(authResult.expires);
    localStorage.setItem('id_token', authResult.token);
    localStorage.setItem('expires_at', JSON.stringify(expiresAt.valueOf()));
  }

  public logout() {
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');
  }

  public isLoggedIn() {
    return moment().isBefore(this.getExpiration());
  }

  isLoggedOut() {
    return !this.isLoggedIn();
  }

  getExpiration() {
    const expiration = localStorage.getItem('expires_at');
    const expiresAt = JSON.parse(expiration);
    const myMoment: moment.Moment = moment(expiresAt);
    return myMoment;
  }
  refreshToken() {
    if (
      this.getExpiration().diff(moment(), 'minutes', true) < 5 &&
      this.getExpiration().diff(moment(), 'minutes', true) > 0
    ) {
      return this.http.get<Token>('auth/refresh').pipe(
        map(res => {
          this.setSession(res);
        })
      );
    } else {
      return null;
    }
  }
}

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private authsrv: AuthService) {}
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this.authsrv.isLoggedOut()) {
      this.router.navigate(['/authentication/page-login'], { queryParams: { returnUrl: state.url } });
      return false;
    }
    return true;
  }
}
