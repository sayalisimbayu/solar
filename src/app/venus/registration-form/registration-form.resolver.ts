import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';

@Injectable()
export class RegistrationFormResolver implements Resolve<any> {
    resolve(route: ActivatedRouteSnapshot): Observable<any> |any {
        return of(true);
    }
}