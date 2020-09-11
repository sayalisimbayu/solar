import { Component, OnInit, OnDestroy } from '@angular/core';
import { SimpleStoreManagerService } from '@app/shared/storemanager/storemanager.service';
import { filter, map } from 'rxjs/operators';
import { StoreEvent } from '@app/shared/storemanager/models/storeEvent.model';
import { UserRepoService } from '@app/shared/reposervice/user.repo.service';
import { UserPage } from '@app/shell/models/user.model';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit, OnDestroy {
  public userInfo: any = [];
  scrollDistance: number = 1;
  throttle: number = 50;
  constructor(
    private store: SimpleStoreManagerService,
    private userRepoService: UserRepoService,
    ) {}
  ngOnInit() {
    this.profileImageSubscription();
  }
  trackByFn(index: number) {
    return index;
  }

  public profileImageSubscription() {
    this.store.$store
      .pipe(filter((se: { key: string }) => se.key === 'userpage'))
      .pipe(
        map((el: StoreEvent) => {
          let moreUsers = [];
          this.userInfo.push(...el.store.value.userpage.users);
        })
      )
      .subscribe();
  }

  onScroll(event: any) {
    this.getUserPage(event);
  }

  getUserPage(event: any) {
    let payload = {
      pageNumber: event.currentPage,
      pageSize: 10,
      search: '',
      orderby: ''
    };
    this.userRepoService
      .getPaged(payload)
      .pipe(
        map((user: UserPage) => {
          if (this.store.has('userpage')) {
            this.store.setIn('userpage', ['userpage'], user);
          } else {
            this.store.add('userpage', { userpage: user }, true);
          }
        })
      )
      .subscribe();
  }
  ngOnDestroy() {
    this.userInfo = [];
  }
}
