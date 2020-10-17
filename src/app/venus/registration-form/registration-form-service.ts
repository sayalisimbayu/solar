import { Injectable, OnDestroy } from "@angular/core";

@Injectable()
export class RegestrationService implements OnDestroy{
    init(){

    }
    constructor(){console.log('-------------------------------------------SERVICE------------------------------------')}
    ngOnDestroy(){}
}