import { Component, OnInit, OnDestroy } from '@angular/core';
import { SimpleStoreManagerService } from '@app/shared/storemanager/storemanager.service';
import { filter, map } from 'rxjs/operators';
import { StoreEvent } from '@app/shared/storemanager/models/storeEvent.model';
import { UserRepoService } from '@app/shared/reposervice/user.repo.service';
import { UserPage } from '@app/shell/models/user.model';
import { ICGridConfig } from '@app/shared/custom.component/cgrid/config/config';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit, OnDestroy {
  public userInfo: any = [];
  scrollDistance: number = 1;
  throttle: number = 50;
  pageGridConfig: ICGridConfig;
  private totalRows: number = 0;
  constructor(
    private store: SimpleStoreManagerService,
    private userRepoService: UserRepoService,
    ) {
      this.pageGridConfig = {
        itemMap: {
          heading: 'name',
          description: 'price',
          subHeading: 'subheader'
        },
        itemMapDescription: {
          heading: '',
          description: 'Price: ',
          subHeading: 'Unit: '
        },
        items: [],
        page: {
          pagesize: 30,
          currentPage: 0,
          throttle: 50,
          scrollDistance: 1,
          scrollUpDistance: 2
        },
        isCheckbox: false,
        isDelete: true,
        functions: {
          onScroll: this.onScroll.bind(this)
        }
      };
    }
  ngOnInit() {
    this.profileImageSubscription();
    this.getUserPage({
      pagesize: 30,
      currentPage: 0,
      throttle: 50,
      scrollDistance: 1,
      scrollUpDistance: 2
    })
    // this.profileImageSubscription();
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
    const that = this;
    let payload = {
      pageNumber: event.currentPage,
      pageSize: 10,
      search: '',
      orderby: ''
    };
    if (this.totalRows >= this.pageGridConfig.items.length) {
    this.userRepoService
      .getPaged(payload)
      .pipe(
        map((user: UserPage) => {
          if(user) {
            if (this.store.has('userpage')) {
              this.store.setIn('userpage', ['userpage'], user);
            } else {
              this.store.add('userpage', { userpage: user }, true);
            };
            that.totalRows = user.totalCount;
            that.pageGridConfig.items.push(...user.users);
            that.store.setIn('userslistconfig', ['items'], that.pageGridConfig.items);
            that.pageGridConfig.page.currentPage++;
            that.store.setIn('userslistconfig', ['page', 'currentPage'], that.pageGridConfig.page.currentPage);
          }
        })
      )
      .subscribe();
    }
  }
  ngOnDestroy() {
    this.userInfo = [];
  }
}
