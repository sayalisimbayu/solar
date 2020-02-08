import { Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserInfo } from '@app/shell/models/user.info.model';
import { AuthService } from '@app/shell/auth/auth.service';
import { UserSetting } from '@app/shell/models/user.setting.model';
import { Observable } from 'rxjs';
import { DataResponse } from '@app/shell/models/data-response.model';
import { map } from 'rxjs/operators';

export class UserRepoService {
  constructor(@Inject(HttpClient) private http: HttpClient, private authSrv: AuthService) {}
  getUserInfo(): Observable<UserInfo> {
    const userId = this.authSrv.getSysUserData().id;
    return this.http.get<DataResponse>('user/' + userId + '/userinfo').pipe(
      map((el: DataResponse) => {
        let response: UserInfo;
        if (el.code === 0) {
          console.error(el);
          return;
        }
        response = el.data;
        return response;
      })
    );
  }
  getUserSetting(): Observable<UserSetting> {
    const userId = this.authSrv.getSysUserData().id;
    return this.http.get<DataResponse>('user/' + userId + '/usersetting').pipe(
      map((el: DataResponse) => {
        let response: UserSetting;
        if (el.code === 0) {
          console.error(el);
          return;
        }
        response = el.data;
        return response;
      })
    );
  }

  saveUserinfo(userInfo: UserInfo): Observable<UserInfo> {
    'https://localhost:44341/api/User/User';
    return this.http.get<DataResponse>(`user/user`).pipe(
      map((el: DataResponse) => {
        let userInfoResponse: UserInfo;
        if (el.code === 0) {
          console.error(el);
          return;
        }
        userInfoResponse = el.data;
        return userInfoResponse;
      })
    );
  }
}
