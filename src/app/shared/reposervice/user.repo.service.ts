import { Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserInfo } from '@app/shell/models/user.info.model';
import { AuthService } from '@app/shell/auth/auth.service';
import { UserSetting } from '@app/shell/models/user.setting.model';
import { Observable, of } from 'rxjs';
import { DataResponse } from '@app/shell/models/data-response.model';
import { map, switchMap } from 'rxjs/operators';
import { IPagedConfig } from '@app/shell/models/paged.model';
import { NotificationRepoService } from './noti.repo.service';
import { INotification } from '@app/shell/models/noti.model';
import { UserPage, AppPermission } from '@app/shell/models/user.model';

export class UserRepoService {
public timelineConfig: INotification[];
  constructor(@Inject(HttpClient) private http: HttpClient,
    private authSrv: AuthService, private notiSrv: NotificationRepoService) { }
  getUserInfo(userId: number = -1): Observable<UserInfo> {
    if (userId === -1) {
      userId = this.authSrv.getSysUserData().id;
    }
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
  getUserInfoByUser(userId: number = -1): Observable<UserInfo> {
    if (userId === -1) {
      userId = this.authSrv.getSysUserData().id;
    }
    return this.http.get<DataResponse>('user/' + userId + '/infobyuser').pipe(
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
  getAppPermissionsById(userId: number): Observable<AppPermission[]> {
    return this.http.get<DataResponse>('user/' + userId + '/permissionsbyid').pipe(
      map((el: DataResponse) => {
        let response: AppPermission[];
        if (el.code === 0) {
          console.error(el);
          return;
        }
        response = el.data;
        return response;
      })
    );
  }
  saveAppPermissions(permissions: AppPermission[]): Observable<AppPermission[]> {
    return this.http.post<DataResponse>('user/permissions', permissions).pipe(
      map((el: DataResponse) => {
        let userInfoResponse: AppPermission[];
        if (el.code === 0) {
          console.error(el);
          return;
        }
        userInfoResponse = el.data;
        return userInfoResponse;
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
  public getPaged(page: IPagedConfig): Observable<UserPage> {
    return this.http.post<DataResponse>('user/page', page).pipe(
      map((el: DataResponse) => {
        let response: UserPage;
        if (el.code === 0) {
          console.error(el);
          return;
        }
        response = {
          users: el.data.item1,
          totalCount: el.data.item2
        };
        return response;
      })
    );
  }
  public delete(id: number) {
    return this.notiSrv.save(this.notiSrv
      .generateNoti('info', 'Deleting Data Started', 'Working')).pipe(switchMap((el: INotification) => {
        return this.http.get<DataResponse>('user/' + id
          + '/' + el.id + '/delete').pipe(
            map((sel: DataResponse) => {
              if (sel.code === 0) {
                console.error(el);
                return false;
              }
              return true;
            })
          );
      }))
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
