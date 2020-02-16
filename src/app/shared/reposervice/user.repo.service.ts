import { Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserInfo } from '@app/shell/models/user.info.model';
import { AuthService } from '@app/shell/auth/auth.service';
import { UserSetting } from '@app/shell/models/user.setting.model';
import { Observable, of } from 'rxjs';
import { DataResponse } from '@app/shell/models/data-response.model';
import { map } from 'rxjs/operators';
import { INotification } from '@app/shell/models/noti.model';

export class UserRepoService {
  public timelineConfig: INotification[];
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
    return this.http.post<DataResponse>(`user/saveuserinfo`, userInfo).pipe(
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
  saveUserInfo(user: any) {
    return this.http.post<DataResponse>('user/save', user).pipe(
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

  saveAppUserinfo(userInfo: any): Observable<any> {
    return this.http.post<DataResponse>(`user/saveappuseraddonconfig`, userInfo).pipe(
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

  public getTimeLineConfig(): Observable<INotification[]> {
    return this.http.post<DataResponse>(`communi/timeline`, {
      "start": 0,
      "number": 100,
      "searchs": "",
      "orderby": ""
    }).pipe(
      map((el: DataResponse) => {
        if (el.code === 0) {
          console.error(el);
          return;
        }

       return el.data;
      })
    )
  //   return of([{
  //       id: 0,
  //       type: 'TYPE1',
  //       message: 'MESSAGE',
  //       flag: true,
  //       status: 'info', // info, primary, warning
  //       userId: 1,
  //       createdDate: '17/11/2020',
  //       updatedDate: '17/11/2020',
  //       isTemporary: true,
  //       isRead: false,
  //       isDeleted: false,
  //       class: ''
  //   },
  //   {
  //       id: 0,
  //       type: 'TYPE1',
  //       message: 'MESSAGE',
  //       flag: true,
  //       status: 'info', // info, primary, warning
  //       userId: 1,
  //       createdDate: '17/11/2020',
  //       updatedDate: '17/11/2020',
  //       isTemporary: true,
  //       isRead: false,
  //       isDeleted: false,
  //       class: ''
  //   },
  //   {
  //       id: 0,
  //       type: 'TYPE1',
  //       message: 'MESSAGE',
  //       flag: true,
  //       status: 'info', // info, primary, warning
  //       userId: 1,
  //       createdDate: '17/11/2020',
  //       updatedDate: '17/11/2020',
  //       isTemporary: true,
  //       isRead: false,
  //       isDeleted: false,
  //       class: ''
  //   }
  // ])
}
}
