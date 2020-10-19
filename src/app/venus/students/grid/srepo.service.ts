import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '@app/shell/auth/auth.service';
import { Observable, of } from 'rxjs';
import { DataResponse } from '@app/shell/models/data-response.model';
import { map, switchMap } from 'rxjs/operators';
import { CategoryPage, Category } from '@app/shell/models/category.model';
import { NotificationRepoService } from '../../../shared/reposervice/noti.repo.service';
import { INotification } from '@app/shell/models/noti.model';
import { IPagedConfig } from '@app/shell/models/paged.model';
@Injectable()
export class StudentsRepoService {
    constructor(
        @Inject(HttpClient) private http: HttpClient,
        private authSrv: AuthService,
        private notiSrv: NotificationRepoService
    ) { }
    public getPaged(page: IPagedConfig): Observable<CategoryPage> {
        return of(
            {
                categories: [
                    {
                        id: 1,
                        name: 'Ruhi',
                        isdeleted: false,
                        productcount: 1,
                        products: [],
                        notificationid: 1
                    }
                ],
                totalCount: 1
            }
      );
        // return this.http.post<DataResponse>('category/page', page).pipe(
        //   map((el: DataResponse) => {
        //     let response: CategoryPage;
        //     if (el.code === 0) {
        //       console.error(el);
        //       return;
        //     }
        //     response = {
        //       categories: el.data.item1,
        //       totalCount: el.data.item2
        //     };
        //     return response;
        //   })
        // );
    }
    public get(id: number): Observable<Category> {
        return this.http.get<DataResponse>('category/' + id).pipe(
            map((el: DataResponse) => {
                let response: Category;
                if (el.code === 0) {
                    console.error(el);
                    return;
                }
                response = el.data;
                return response;
            })
        );
    }
    public save(category: Category) {
        return this.notiSrv.save(this.notiSrv.generateNoti('info', 'Saving Data Started', 'Working')).pipe(
            switchMap((el: INotification) => {
                return this.http.post<DataResponse>('category', category).pipe(
                    map((sel: DataResponse) => {
                        if (sel.code === 0) {
                            console.error(el);
                            return category;
                        }
                        return sel.data;
                    })
                );
            })
        );
    }
    public delete(id: number) {
        return this.notiSrv.save(this.notiSrv.generateNoti('info', 'Deleting Data Started', 'Working')).pipe(
            switchMap((el: INotification) => {
                return this.http.get<DataResponse>('category/' + id + '/' + el.id + '/delete').pipe(
                    map((sel: DataResponse) => {
                        if (sel.code === 0) {
                            console.error(el);
                            return false;
                        }
                        return true;
                    })
                );
            })
        );
    }
}
