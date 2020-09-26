import { Component, OnDestroy, OnInit, ViewChild, ViewContainerRef } from "@angular/core";
import { LazyLoaderService } from '@app/shared/services/lazy-loader.service';
import { SimpleStoreManagerService } from '@app/shared/storemanager/storemanager.service';

@Component({
    selector: 'app-user-wrapper',
    template: `
          <div class="input-group m-b-20">
            <div class="input-group-prepend">
              <span class="input-group-text"><i class="icon-magnifier"></i></span>
            </div>
            <input type="text" class="form-control" [(ngModel)]="searchKey" placeholder="Search..." (keyup.enter)="onEnter(searchKey)" />
          </div>
    <ng-template #userList></ng-template>`
})
export class UserWrapperComponent implements OnInit, OnDestroy {
    @ViewChild('userList', { read: ViewContainerRef, static: true })
    userList: ViewContainerRef;
    searchKey: string = "";
    constructor(
        private lazyLoader: LazyLoaderService,
        private store: SimpleStoreManagerService
        ) {}
    ngOnInit() {
        this.lazyLoader.load('app-user-list', this.userList, 'userpage', (cmpRef: any) => {});
    }
    onEnter(searchKey: string) {
        (this.store.has('userSerchKey')) ? (this.store.setIn('userSerchKey', ['searchKey'], searchKey)) : (this.store.add('userSerchKey', {searchKey}, true));
    }
    ngOnDestroy() {
        (this.userList && this.userList.length > 0) && (this.userList.clear());
        this.store.remove('userSerchKey');
    }
}