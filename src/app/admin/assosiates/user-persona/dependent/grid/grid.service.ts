import { ICPageConfig, ICGridConfig } from '@app/shared/custom.component/cgrid/config/config';
import { SimpleStoreManagerService } from '@app/shared/storemanager/storemanager.service';
import { Subscription } from 'rxjs';
import { UserRepoService } from '@app/shared/reposervice/user.repo.service';
import { UserPage } from '@app/shell/models/user.model';
import { map } from 'rxjs/operators';

export class UserPersonaGridService {
  public pageGridConfig: ICGridConfig;
  throttle = 50;
  scrollDistance = 1;
  scrollUpDistance = 2;
  latestSearch: string = undefined;
  private totalRows: number = 0;
  private subscription: Subscription;

  constructor(private store: SimpleStoreManagerService, private userRepSrv: UserRepoService) {
    this.pageGridConfig = {
      itemMap: {
        heading: 'displayname',
        description: '',
        subHeading: 'username',
        image: ''
      },
      itemMapDescription: {
        heading: '',
        description: '',
        subHeading: 'User Name: ',
        image: ''
      },
      items: [],
      page: {
        pagesize: 30,
        currentPage: 0,
        throttle: 50,
        scrollDistance: 1,
        scrollUpDistance: 2
      },
      isDefaultImage: true,
      isCheckbox: false,
      isDelete: true,
      functions: {
        onDelete: this.onDelete.bind(this),
        onSelect: this.onSelect.bind(this),
        onScroll: this.onScroll.bind(this)
      }
    };
  }
  getLatestPage(event: ICPageConfig, search?: string) {
    const that = this;
    if (this.totalRows >= this.pageGridConfig.items.length) {
      return this.userRepSrv
        .getPaged({
          pageNumber: event.currentPage,
          pageSize: event.pagesize,
          search
        })
        .pipe(
          map((el: UserPage) => {
            if (el !== undefined) {
              debugger;
              this.latestSearch = search;
              that.totalRows = el.totalCount;
              that.pageGridConfig.items.push(...el.users);
              that.store.setIn('userpersonapagegridconfig', ['items'], that.pageGridConfig.items);
              that.pageGridConfig.page.currentPage++;
              that.store.setIn(
                'userpersonapagegridconfig',
                ['page', 'currentPage'],
                that.pageGridConfig.page.currentPage
              );
            }
          })
        );
    }
  }
  onScroll(event: ICPageConfig) {
    this.getLatestPage(event, this.latestSearch);
  }
  onDelete(event: any, userpersona: any) {
    console.log(userpersona);
    // alert('deleting');
    return this.userRepSrv.delete(userpersona.id).subscribe(el => {
      return el;
    });
  }
  onSelect(event: any, userpersona: any) {
    debugger;
    this.store.add('userpersonanavigatingid', userpersona.id, true);
    this.navigateToForm();
  }
  navigateToForm() {
    this.store.setIn('userpersonapageconfig', ['pageHeading'], 'Persona Form');
    this.store.setIn('userpersonapageconfig', ['pageBodyUrl'], 'app-page-userpersona-form');
  }
}
