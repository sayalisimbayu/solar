import { Injectable, Inject } from '@Angular/core';
import { HttpClient } from '@angular/common/http';
import * as moment from 'moment';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AppPermission, User } from '../models/user.model';
import { DataResponse } from '../models/data-response.model';
import { Token, Auth } from '../models/auth.model';
import { AppSetting } from '../models/appsetting.model';
import { CryptService } from '@app/shared/services/crypt.service';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    constructor(@Inject(HttpClient) private http: HttpClient, private router: Router,
        private cryptSvc: CryptService) { }
    login(auth: Auth) {
        return this.http.post<Token>('auth/login', auth)
            .pipe(map(res => {
                this.setSession(res);
            }))
            .pipe(switchMap(() => this.fetchAppsettings()));
    }
    fetchpermission(username: string): Observable<AppPermission[]> {
        return this.http.get<DataResponse>('user/' + username + '/permissions').pipe(map((res: DataResponse) => {
            if (res.code === 0) {
                console.error(res);
                return;
            }
            const permissions: AppPermission[] = res.data.permissions;
            this.setSysUserData(res.data);
            this.setPermissions(permissions);
            return permissions;
        }));
    }
    getPermissions(): AppPermission[] {
        if (localStorage.getItem('apppermission')) {
            return JSON.parse(localStorage.getItem('apppermission'));
        }
        return null;
    }
    public lockScreen() {
        if (this.isLoggedIn()) {
            this.router.navigate(['/authentication/page-lockscreen']);
        }
    }
    public getRememberedCredentials() {
        if (localStorage.getItem('rememberme') && localStorage.getItem('rememberme') !== '') {
            const lcRememberme = this.cryptSvc.get('simbayu$#@$^@ERF', localStorage.getItem('rememberme'));
            if (lcRememberme != '') {
                return JSON.parse(lcRememberme);
            }
        }
        return;
    }
    public rememberCredentials(user: any){
        localStorage.setItem('rememberme', this.cryptSvc.set('simbayu$#@$^@ERF', JSON.stringify(user)));
    }
    public getSysUserData(): User {
        return JSON.parse(localStorage.getItem('sysuserdata'));
    }
    public getAppsettings(): AppSetting[] {
        return JSON.parse(localStorage.getItem('appsettings'));
    }
    public cleanStorage(){
        localStorage.removeItem('expires_at');
        localStorage.removeItem('appsettings');
        localStorage.removeItem('id_token');
        localStorage.removeItem('apppermission');
    }
    public logout() {
        this.cleanStorage();
        localStorage.removeItem('sysuserdata');
        this.router.navigate(['/authentication/page-login']);
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
        if (this.getExpiration()
            .diff(moment(), 'minutes', true) < 5 && this.getExpiration().diff(moment(), 'minutes', true) > 0) {
            return this.http.get<Token>('auth/refresh')
                .pipe(map(res => {
                    this.setSession(res);
                }));
        } else {
            return null;
        }
    }
    public forgot(email: string): Observable<boolean> {
        return this.http.get<DataResponse>('auth/' + email + '/forgot/').pipe(map((res: DataResponse) => {
            if (res.code === 1) {
                return true;
            }
            return false;
        }));
    }
    public reset(reset: any): Observable<boolean> {
        return this.http.post<DataResponse>('auth/reset/', reset).pipe(map((res: DataResponse) => {
            if (res.code === 1) {
                return true;
            }
            return false;
        }));
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
    private fetchAppsettings(): Observable<AppSetting[]> {
        return this.http.get<DataResponse>('general/settings').pipe(map((res: DataResponse) => {
            this.setAppsettings(res.data);
            return res.data;
            // return JSON.parse(res.data);
        }));
    }
    private setSession(authResult: Token) {
        const expiresAt = moment(authResult.expires);
        localStorage.setItem('id_token', authResult.token);
        localStorage.setItem('expires_at', JSON.stringify(expiresAt.valueOf()));
    }
}

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
    constructor(private router: Router, private authsrv: AuthService) { }
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (this.authsrv.isLoggedOut()) {
            this.router.navigate(['/authentication/page-login'], { queryParams: { returnUrl: state.url } });
            return false;
        }
        return true;

    }
}
