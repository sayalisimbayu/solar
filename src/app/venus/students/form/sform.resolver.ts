import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable()
export class SFormResolver implements Resolve<any> {
    resolve(route: ActivatedRouteSnapshot): Observable<any> | Promise<any> | any {
        return ;
    }
}