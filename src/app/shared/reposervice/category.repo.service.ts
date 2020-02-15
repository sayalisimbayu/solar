import { Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '@app/shell/auth/auth.service';
import { Observable } from 'rxjs';
import { DataResponse } from '@app/shell/models/data-response.model';
import { map, switchMap } from 'rxjs/operators';
import { CategoryPage } from '@app/shell/models/category.model';
import { NotificationRepoService } from './noti.repo.service';
import { INotification } from '@app/shell/models/noti.model';

export class CategoryRepoService {
    constructor(@Inject(HttpClient) private http: HttpClient, private authSrv: AuthService,
        private notiSrv: NotificationRepoService) { }
    public getPaged(pagenumber: number, pagesize: number): Observable<CategoryPage> {
        return this.http.get<DataResponse>('category/' + pagenumber + '/' + pagesize + '/page').pipe(
            map((el: DataResponse) => {
                let response: CategoryPage;
                if (el.code === 0) {
                    console.error(el);
                    return;
                }
                response = {
                    categories: el.data.item1,
                    totalCount: el.data.item2
                };
                return response;
            })
        );
    }
    public delete(id: number) {
        return this.notiSrv.save(this.notiSrv
            .generateNoti('info', 'Saving Data Started', 'Working')).pipe(switchMap((el: INotification) => {
                debugger;
                return this.http.get<DataResponse>('category/' + id
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
}
