import { Component, OnInit, AfterViewInit, ViewChild, ViewContainerRef, OnDestroy } from '@angular/core';
import { LazyLoaderService } from '@app/shared/services/lazy-loader.service';
import { SimpleStoreManagerService } from '@app/shared/storemanager/storemanager.service';
import { IPageTitleConfig } from '@app/core/layout/page-title/model/page-title.config.interface';
import { AuthService } from '@app/shell/auth/auth.service';
import { User } from '@app/shell/models/user.model';
import { UserRepoService } from '@app/shared/reposervice/user.repo.service';
import { UserInfo } from '@app/shell/models/user.info.model';
import { UserSetting } from '@app/shell/models/user.setting.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

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
  // public userInfo: UserInfo;
  public userSetting: UserSetting;

  registerForm: FormGroup;
  submitted = false;

  constructor(
    private lazyLoader: LazyLoaderService,
    private store: SimpleStoreManagerService,
    private authSrv: AuthService,
    private userRepoService: UserRepoService,
    private formBuilder: FormBuilder
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
  ngOnInit() {
    // Form Builder
    this.registerForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      gender: ['true', Validators.required],
      birthDate: ['', Validators.required],
      social: ['', Validators.required],
      addressLine1: ['', Validators.required],
      addressLine2: ['', Validators.required],
      city: ['', Validators.required],
      ustate: ['', Validators.required],
      countryCode: ['', Validators.required]
    });
    // this.userInfo = {
    //   id: 0,
    //   usid: 0,
    //   firstName: '',
    //   lastName: '',
    //   mobile: '',
    //   gender: 'true',
    //   birthDate: new Date(),
    //   social: '',
    //   addressLine1: '',
    //   addressLine2: '',
    //   city: '',
    //   ustate: '',
    //   countryCode: '',
    // }
  }
  ngAfterViewInit(): void {
    debugger;
    this.loadPageTitle();
    this.userRepoService.getUserInfo().subscribe(el => {
      alert('got info');
      console.log(el);
      // this.registerForm.setValue(el);
      // this.userInfo = el;
      // this.userInfo = {
      //   id: 0,
      //   usid: 0,
      //   firstName: '',
      //   lastName: '',
      //   mobile: '',
      //   gender: 'true',
      //   birthDate: new Date(),
      //   social: '',
      //   addressLine1: '',
      //   addressLine2: '',
      //   city: '',
      //   ustate: '',
      //   countryCode: '',
      // }
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

  onSubmit() {
    debugger;
    this.submitted = true;
    if (this.registerForm.invalid) {
      return;
    }

    // this.userRepoService.saveUserinfo(this.userInfo).subscribe(el => {
    //   alert('user saved successfully');
    //   console.log(el);
    //   this.userInfo = el;
    // });
    // console.log('userInfo',this.userInfo);
  }
}
