import { INotification, INotificationPaged } from '@app/shell/models/noti.model';
import { DataResponse } from '@app/shell/models/data-response.model';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '@app/shell/auth/auth.service';
import { map } from 'rxjs/operators';
import * as moment from 'moment';

export class NotificationRepoService {
    constructor(private http: HttpClient, private authSrv: AuthService) { }
    public generateNoti(type: string, message: string, status: string): INotification {
        const userId = this.authSrv.getSysUserData().id;
        const noti: INotification = {
            id: 0,
            type: type,
            message: message,
            flag: true,
            status: status, // info, primary, warning
            userId: userId,
            createdDate: moment().format('YYYY-MM-DD'),
            updatedDate: moment().format('YYYY-MM-DD'),
            isTemporary: false,
            isRead: false,
            isDeleted: false
        };
        return noti;
    }
    public save(noti: INotification) {
        return this.http.post<DataResponse>('communi', noti).pipe(
            map((el: DataResponse) => {
                let response: INotification;
                if (el.code === 0) {
                    console.error(el);
                    return;
                }
                response = el.data;
                return response;
            })
        );
    }
    public getPaged(pagenumber: number, pagesize: number) {
        return this.http.get<DataResponse>('communi/' + pagenumber + '/' + pagesize + '/page').pipe(
            map((el: DataResponse) => {
                let response: INotificationPaged;
                if (el.code === 0) {
                    console.error(el);
                    return;
                }
                response = {
                    notifications: el.data.item1,
                    totalCount: el.data.item2
                };
                return response;
            })
        );
    }
    public getById(id: number) {
        return this.http.get<DataResponse>('communi/' + id).pipe(
            map((el: DataResponse) => {
                let response: INotification;
                if (el.code === 0) {
                    console.error(el);
                    return;
                }
                response = el.data;
                return response;
            })
        );
    }
}