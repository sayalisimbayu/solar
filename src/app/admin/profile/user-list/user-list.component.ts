import { Component, OnInit, OnDestroy } from '@angular/core';
import { SimpleStoreManagerService } from '@app/shared/storemanager/storemanager.service';
import { filter, map } from 'rxjs/operators';
import { StoreEvent } from '@app/shared/storemanager/models/storeEvent.model';

@Component({
    selector: 'app-user-list',
    templateUrl: './user-list.component.html',
    styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit, OnDestroy {
    public userInfo: any = [];
    constructor(
        private store: SimpleStoreManagerService,
    ) { }
    ngOnInit() {
        this.profileImageSubscription();
    }
    trackByFn(index: number,){
        return index;
    }

    public profileImageSubscription() {
        this.store.$store
            .pipe(filter((se: { key: string }) => se.key === 'userpage'))
            .pipe(
                map((el: StoreEvent) => {
                    this.userInfo = el.store.value.userpage.users;
                })
            ).subscribe();
    }
    ngOnDestroy() {}
}