import { Component, OnInit, AfterViewInit, ViewChild, ViewContainerRef, OnDestroy } from '@angular/core';
import { LazyLoaderService } from '@app/shared/services/lazy-loader.service';
import { SimpleStoreManagerService } from '@app/shared/storemanager/storemanager.service';
import { IPageTitleConfig } from '@app/core/layout/page-title/model/page-title.config.interface';
import { AuthService } from '@app/shell/auth/auth.service';
import { User } from '@app/shell/models/user.model';
import { UserRepoService } from '@app/shared/reposervice/user.repo.service';
import { UserInfo } from '@app/shell/models/user.info.model';
import { UserSetting } from '@app/shell/models/user.setting.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html'
})
export class ProfileComponent implements OnInit, AfterViewInit, OnDestroy {
  public activeTab: string = 'Overview';
  @ViewChild('pagetitle', { read: ViewContainerRef, static: true })
  pageTitle: ViewContainerRef;
  pageTitleConfig: IPageTitleConfig;
  public user: User;
  public userInfo: UserInfo;
  public userSetting: UserSetting;
  constructor(
    private lazyLoader: LazyLoaderService,
    private store: SimpleStoreManagerService,
    private authSrv: AuthService,
    private userRepoService: UserRepoService
  ) {
    this.user = this.authSrv.getSysUserData();
    this.pageTitleConfig = {
      breadCrumb: [
        {
          title: 'Dashboard',
          url: 'admin/dashboard/index',
          clickable: false
        },
        {
          title: 'Profile',
          url: '',
          clickable: false
        }
      ],
      leftComponentUrl: 'page-header-chart',
      pageTitle: 'Profile'
    };
  }
  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
  }
  ngOnInit() {}
  ngAfterViewInit(): void {
    this.loadPageTitle();
    this.userRepoService.getUserInfo().subscribe(el => {
      alert('got info');
      console.log(el);
      this.userInfo = el;
    });
    this.userRepoService.getUserSetting().subscribe(el => {
      alert('got setting');
      console.log(el);
      this.userSetting = el;
    });
  }
  toggleTabs(tab: string) {
    if (tab) {
      this.activeTab = tab;
    }
  }
  loadPageTitle() {
    const that = this;
    this.pageTitle.clear();
    this.lazyLoader.load('page-title', this.pageTitle, 'profile_page_title', (_cdRef: any) => {
      that.store.add('profile_page_title', that.pageTitleConfig, true);
    });
  }
}
