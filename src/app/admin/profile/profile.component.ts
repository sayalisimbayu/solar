import { INotification } from '@app/shell/models/noti.model';
import {
  Component,
  OnInit,
  AfterViewInit,
  ViewChild,
  ViewContainerRef,
  OnDestroy,
  ChangeDetectorRef
} from '@angular/core';
import { LazyLoaderService } from '@app/shared/services/lazy-loader.service';
import { SimpleStoreManagerService } from '@app/shared/storemanager/storemanager.service';
import { IPageTitleConfig } from '@app/core/layout/page-title/model/page-title.config.interface';
import { AuthService } from '@app/shell/auth/auth.service';
import { User, UserProfile, AppPermission, UserPage } from '@app/shell/models/user.model';
import { UserRepoService } from '@app/shared/reposervice/user.repo.service';
import { UserInfo } from '@app/shell/models/user.info.model';
import { UserSetting } from '@app/shell/models/user.setting.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Control } from 'leaflet';
import { forkJoin } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';
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

  public birthDate: Date = new Date(2020, 1, 1);

  basicInformation: FormGroup;
  accountData: FormGroup;
  generalInformationFormGroup: FormGroup;
  submitted = false;

  // OverView
  @ViewChild('timelineGrid', { read: ViewContainerRef, static: true })
  timelineGrid: ViewContainerRef;

  @ViewChild('userList', { read: ViewContainerRef, static: true })
  userList: ViewContainerRef;
  public userMapUrl = '';

  public date: string = new Date().toISOString().split('T')[0];
  public sociallist: any[] = [];

  public socialListArray: any[] = [
    { type: 'Twitter', class: 'fa-twitter' },
    { type: 'FaceBook', class: 'fa-facebook' },
    { type: 'GitHub', class: 'fa-github' },
    { type: 'Instagram', class: 'fa-instagram' }
  ];

  public socialArray: any[] = [
    { typeInfo: { type: 'facebook', class: 'fa-facebook' }, link: 'facebook.com' },
    { typeInfo: { type: 'instagram', class: 'fa-instagram' }, link: 'instagram.com' }
  ];

  constructor(
    private lazyLoader: LazyLoaderService,
    private store: SimpleStoreManagerService,
    private authSrv: AuthService,
    private userRepoService: UserRepoService,
    private formBuilder: FormBuilder,
    private cdRef: ChangeDetectorRef
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
    this.getUserPage();
    // set empty user info as on load user info is undefine or implement resolver
    this.userInfo = this.setEmptyUserInfo();

    // getUserInfo
    this.getUserInfo();

    // Form Builder
    this.basicInformation = this.setBasicInformationFormBuilder();
    this.accountData = this.setaccountDataFormBuilder();
    this.generalInformationFormGroup = this.setGeneralInformationFormGroup();
    this.loadOverView();
  }
  ngAfterViewInit(): void {
    this.loadPageTitle();
    this.userRepoService.getUserSetting().subscribe(el => {
      console.log(el);
      this.userSetting = el;
    });
  }
  setEmptyUserInfo(): UserInfo {
    return {
      id: 0,
      usid: 0,
      firstname: '',
      lastname: '',
      gender: false,
      displayname: '',
      mobile: '',
      social: '',
      birthdate: this.birthDate,
      addresslinE1: '',
      addresslinE2: '',
      city: '',
      ustate: '',
      countrycode: '',
      profileimg: '',
      sociallist: this.socialArray
    };
  }
  getUserInfo() {
    this.userRepoService.getUserInfo().subscribe(el => {
      if (el) {
        // alert('got info');
        console.log(el);
        this.userInfo = el;
        this.userInfo.sociallist = JSON.parse(this.userInfo.sociallist);
        this.store.has('userInfo') && this.store.remove('userInfo');
        this.store.add('userInfo', this.userInfo, true);
        this.basicInformation.controls['id'].setValue(el.id);
        this.basicInformation.controls['usid'].setValue(el.usid);
        this.user = this.setUser(this.userInfo);
        this.cdRef.detectChanges();
        // set value for mobile
        this.basicInformation.controls['mobile'].setValue(this.userInfo.mobile);

        // set account data
        debugger;
        this.accountData.setValue(this.setUpdatedaccountData(this.userInfo, this.user));
      } else {
        this.userInfo = this.setEmptyUserInfo();
        this.basicInformation.controls['id'].setValue(this.userInfo.id);
        this.basicInformation.controls['usid'].setValue(this.userInfo.usid);
        this.user = this.setUser(this.userInfo);

        // set value for mobile
        this.basicInformation.controls['mobile'].setValue(this.userInfo.mobile);

        // set account data
        debugger
        this.accountData.setValue(this.setUpdatedaccountData(this.userInfo, this.user));
      }
      this.store.has('userInfo') && this.store.remove('userInfo');
      this.store.add('userInfo', this.userInfo, true);
      this.userRepoService.getLatitudeAndLogitude(this.userInfo).subscribe((response: any) => {
        this.userMapUrl = response;
        this.cdRef.detectChanges();
      });
      this.getPermissions();
    });
  }
  setBasicInformationFormBuilder(): FormGroup {
    return this.formBuilder.group({
      id: [],
      usid: [],
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      username: ['amar@simbayu.in'],
      displayname: [`${this.userInfo.firstname} ${this.userInfo.lastname}`],
      email: [''],
      gender: ['true', Validators.required],
      mobile: [''],
      birthdate: [this.birthDate, Validators.required],
      social: ['', Validators.required],
      addresslinE1: ['', Validators.required],
      addresslinE2: ['', Validators.required],
      city: ['', Validators.required],
      ustate: ['', Validators.required],
      countrycode: ['', Validators.required],
      currentpassword: [''],
      password: [''],
      confirmnewpassword: [''],
      profileimg: [''],
      sociallist: [[]]
    });
  }
  setaccountDataFormBuilder(): FormGroup {
    return this.formBuilder.group({
      id: [0],
      usid: [0],
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      username: [{ value: 'amar@simbayu.in', disabled: true }],
      displayname: [`${this.userInfo.firstname} ${this.userInfo.lastname}`],
      email: [''],
      gender: ['', Validators.required],
      mobile: [''],
      birthdate: ['', Validators.required],
      social: ['', Validators.required],
      addresslinE1: ['', Validators.required],
      addresslinE2: ['', Validators.required],
      city: ['', Validators.required],
      ustate: ['', Validators.required],
      countrycode: ['', Validators.required],
      currentpassword: [''],
      password: [''],
      confirmnewpassword: [''],
      profileimg: [''],
      sociallist: [[]]
    });
  }
  setGeneralInformationFormGroup(): FormGroup {
    return this.formBuilder.group({
      id: [0],
      usid: [1],
      language: ['English (United States)'],
      timezone: ['Abidjan'],
      dateformat: ['May 18, 2018'],
      lucidnotification: ["I'd like to receive the following emails"],
      socialInput: [''],
      socialType: ['']
    });
  }
  setUpdatedaccountData(userInfo: UserInfo, user: User) {
    return {
      id: userInfo.id,
      usid: userInfo.usid,
      firstname: userInfo.firstname,
      lastname: userInfo.lastname,
      username: user.username,
      displayname: `${userInfo.firstname} ${userInfo.lastname}`,
      email: user.email,
      gender: userInfo.gender,
      mobile: '',
      birthdate: userInfo.birthdate,
      social: userInfo.social,
      addresslinE1: userInfo.addresslinE1,
      addresslinE2: userInfo.addresslinE2,
      city: userInfo.city,
      ustate: userInfo.ustate,
      countrycode: userInfo.countrycode,
      currentpassword: '',
      password: '',
      confirmnewpassword: '',
      profileimg: userInfo.profileimg,
      sociallist: [JSON.stringify(userInfo.sociallist)]
    };
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
  onSubmit(data: any) {
    this.submitted = true;
    if (this.basicInformation.invalid) {
      return;
    }
    this.basicInformation.value['gender'] =
      this.basicInformation.value['gender'].toString().toLowerCase() === 'true' ? true : false;
      data.sociallist = JSON.stringify(data.sociallist);
    // appuserinfo
    this.userRepoService.saveUserinfo(data).subscribe(el => {
      alert('user saved successfully');
      console.log(el);
      // set userInfo
      this.userInfo = el;
      // set user
      this.user = this.setUser(this.userInfo);
      // set account data
      this.accountData.setValue(this.setUpdatedaccountData(this.userInfo, this.user));
      // set form builder
      this.basicInformation.setValue(el);
      el.gender
        ? this.basicInformation.controls['gender'].setValue('true')
        : this.basicInformation.controls['gender'].setValue('false');
    });
    console.log('userInfo', this.basicInformation.value);
  }

  onSubmitAccountData(data: any) {
    this.userRepoService
      .saveUserInfo(data)
      .pipe(
        mergeMap(el =>
          this.userRepoService.saveUserinfo(data).pipe(
            map(el => {
              alert('Passowrd Change successfully, mobile name updated successfully');
            })
          )
        )
      )
      .subscribe();
  }
  onGeneralInformationSubmit(data: any) {
    this.userRepoService
      .saveAppUserinfo(data)
      .pipe()
      .subscribe();
  }
  setUser(userInfo: UserInfo): User {
    return {
      fullName: `${this.userInfo.firstname} ${this.userInfo.lastname}`,
      email: 'amar@simbayu.in',
      displayname: `${this.userInfo.firstname} ${this.userInfo.lastname}`,
      username: 'amar@simbayu.in',
      id: userInfo.id,
      isdeleted: false,
      otp: '',
      password: '',
      permissions: [
        {
          id: 0,
          appuserid: 0,
          mode: '',
          alias: '',
          value: 0,
          appsettingid: 0,
          permission: 0,
          notificationid: 0
        }
      ],
      addOnConfig: {},
      lastLoggin: '',
      confirmPassword: '',
      notificationid: 0
    };
  }

  // OverView
  loadOverView() {
    this.lazyLoader.load('app-timelineChart', this.timelineGrid, 'timelineconfig', (cmpRef: any) => {});
  }
  getPermissions() {
    if (this.user.id !== 0) {
      this.userRepoService.getAppPermissionsById(this.user.id).subscribe((sel: AppPermission[]) => {
        this.user.permissions = sel;
        this.cdRef.detectChanges();
      });
    }
  }

  getUserPage() {
    this.lazyLoader.load('app-user-list', this.userList, 'userpage', (cmpRef: any) => {});
  }

  OnEnter(event: any, data: any) {
    if (event.keyCode == 13) {
      this.sociallist.push({typeInfo: {type: data.socialType, class: `fa-${data.socialType}`}, link: data.socialInput});
      this.accountData.controls['sociallist'].setValue(JSON.stringify(this.sociallist));
      this.generalInformationFormGroup.controls['socialInput'].setValue('');
    }
  }
  trackByFn(index: number) {
    return index;
  }
  onSocialDelete(index: number, social: string) {
    this.sociallist.splice(index,1);
  }
}
