import { Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '@app/shell/auth/auth.service';
import { Observable } from 'rxjs';
import { DataResponse } from '@app/shell/models/data-response.model';
import { map, switchMap } from 'rxjs/operators';
import { NotificationRepoService } from './noti.repo.service';
import { INotification } from '@app/shell/models/noti.model';
import { IPagedConfig } from '@app/shell/models/paged.model';
import { Product, ProductPage } from '@app/shell/models/product.model';

export class ProductRepoService {
    constructor(@Inject(HttpClient) private http: HttpClient, private authSrv: AuthService,
        private notiSrv: NotificationRepoService) { }
    public getPaged(page: IPagedConfig): Observable<ProductPage> {
        return this.http.post<DataResponse>('product/page', page).pipe(
            map((el: DataResponse) => {
                let response: ProductPage;
                if (el.code === 0) {
                    console.error(el);
                    return;
                }
                response = {
                    products: el.data.item1,
                    totalCount: el.data.item2
                };
                return response;
            })
        );
    }
    public get(id: number): Observable<Product> {
        return this.http.get<DataResponse>('product/' + id).pipe(
            map((el: DataResponse) => {
                let response: Product;
                if (el.code === 0) {
                    console.error(el);
                    return;
                }
                response = el.data;
                return response;
            })
        );
    }
    public save(product: Product) {
        return this.notiSrv.save(this.notiSrv
            .generateNoti('info', 'Saving Data Started', 'Working')).pipe(switchMap((el: INotification) => {
                return this.http.post<DataResponse>('product', product).pipe(
                    map((sel: DataResponse) => {
                        if (sel.code === 0) {
                            console.error(el);
                            return product;
                        }
                        return sel.data;
                    })
                );
            }))
    }
    public delete(id: number) {
        return this.notiSrv.save(this.notiSrv
            .generateNoti('info', 'Deleting Data Started', 'Working')).pipe(switchMap((el: INotification) => {
                return this.http.get<DataResponse>('product/' + id
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
