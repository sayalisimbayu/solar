import { Component, OnInit, OnDestroy } from '@angular/core';
import { SimpleStoreManagerService } from '@app/shared/storemanager/storemanager.service';
import { map } from 'rxjs/operators';
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
      // this.pageGridConfig = {
      //   itemMap: {
      //     heading: 'name',
      //     description: 'price',
      //     subHeading: 'subheader'
      //   },
      //   itemMapDescription: {
      //     heading: '',
      //     description: 'Price: ',
      //     subHeading: 'Unit: '
      //   },
      //   items: [],
      //   page: {
      //     pagesize: 30,
      //     currentPage: 0,
      //     throttle: 50,
      //     scrollDistance: 1,
      //     scrollUpDistance: 2
      //   },
      //   isCheckbox: false,
      //   isDelete: true,
      //   functions: {
      //     onScroll: this.onScroll.bind(this)
      //   }
      // };
      this.userInfo = [];
    }
  ngOnInit() {
    this.getUserPage({
      pagesize: 30,
      currentPage: 0,
      throttle: 50,
      scrollDistance: 1,
      scrollUpDistance: 2
    })
  }
  trackByFn(index: number) {
    return index;
  }
  //#region INFINITE SCROLL METHODS
  // onScroll(event: any) {
  //   this.getUserPage(event);
  // }
  // getUserPage(event: any) {
  //   const that = this;
  //   let payload = {
  //     pageNumber: event.currentPage,
  //     pageSize: 10,
  //     search: '',
  //     orderby: ''
  //   };
  //   if ((this.totalRows > this.pageGridConfig.items.length) || this.totalRows === 0) {
  //   this.userRepoService
  //     .getPaged(payload)
  //     .pipe(
  //       map((user: UserPage) => {
  //         if(user) {
  //           that.totalRows = user.totalCount;
  //           that.pageGridConfig.items.push(...user.users);
  //           that.pageGridConfig.page.currentPage++;
  //           this.userInfo.push(...user.users);
  //         }
  //       })
  //     ).subscribe();
  //   }
  // }
  //#endregion


  getUserPage(event: any) {
    const that = this;
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
          if(user) {
            this.userInfo.push(...user.users);
          }
        })
      ).subscribe();
  }
  ngOnDestroy() {
    this.userInfo = [];
  }
}
