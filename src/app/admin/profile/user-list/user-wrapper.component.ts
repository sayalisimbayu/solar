import { Component, OnDestroy, OnInit, ViewChild, ViewContainerRef } from "@angular/core";
import { LazyLoaderService } from '@app/shared/services/lazy-loader.service';

@Component({
    selector: 'app-user-wrapper',
    template: `<ng-template #userList></ng-template>`
})
export class UserWrapperComponent implements OnInit, OnDestroy {
    @ViewChild('userList', { read: ViewContainerRef, static: true })
    userList: ViewContainerRef;
    constructor(private lazyLoader: LazyLoaderService,) {}
    ngOnInit() {
        this.lazyLoader.load('app-user-list', this.userList, 'userpage', (cmpRef: any) => {});
    }
    ngOnDestroy() {
        (this.userList && this.userList.length > 0) && (this.userList.clear());
    }
}