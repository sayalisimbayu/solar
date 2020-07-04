import { INotification } from '@app/shell/models/noti.model';
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
      alert('got setting');
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
      displayname:'',
      mobile: '',
      social: '',
      birthdate: this.birthDate,
      addresslinE1: '',
      addresslinE2: '',
      city: '',
      ustate: '',
      countrycode: '',
    }
  }
  getUserInfo() {
    this.userRepoService.getUserInfo().subscribe(el => {
      if (el) {
        alert('got info');
        console.log(el);
        this.userInfo = el;
        this.basicInformation.controls['id'].setValue(el.id);
        this.basicInformation.controls['usid'].setValue(el.usid);
        this.user = this.setUser(this.userInfo);

        // set value for mobile
        this.basicInformation.controls['mobile'].setValue(this.userInfo.mobile);

        // set account data
        this.accountData.setValue(this.setUpdatedaccountData(this.userInfo, this.user));
      } else {
        this.userInfo = this.setEmptyUserInfo();
        this.basicInformation.controls['id'].setValue(this.userInfo.id);
        this.basicInformation.controls['usid'].setValue(this.userInfo.usid);
        this.user = this.setUser(this.userInfo);

        // set value for mobile
        this.basicInformation.controls['mobile'].setValue(this.userInfo.mobile);

        // set account data
        this.accountData.setValue(this.setUpdatedaccountData(this.userInfo, this.user));
      }
      
    });
  }
  setBasicInformationFormBuilder(): FormGroup {
      return this.formBuilder.group({
      id:[],
      usid: [],
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      username: [''],
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
      currentpassword:[''],
      password: [''],
      confirmnewpassword: [''],
    });
  }
  setaccountDataFormBuilder(): FormGroup {
      return this.formBuilder.group({
      id:[0],
      usid: [0],
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      username: [{value:'', disabled: true}],
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
      currentpassword:[''],
      password: [''],
      confirmnewpassword: [''],
    });
  }
  setGeneralInformationFormGroup(): FormGroup {
    return this.formBuilder.group({
      id: [0],
      usid: [1],
      language: ['English (United States)'],
      timezone: ['Abidjan'],
      dateformat: ['May 18, 2018'],
      lucidnotification: ["I'd like to receive the following emails"]
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
      currentpassword:'',
      password: '',
      confirmnewpassword: ''
    }
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
    this.basicInformation.value['gender'] = this.basicInformation.value['gender']
    .toString().toLowerCase() === 'true' ? true : false;
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
      (el.gender) ? this.basicInformation.controls['gender'].setValue('true') :
      this.basicInformation.controls['gender'].setValue('false');
    });
    console.log('userInfo',this.basicInformation.value);
  }

  onSubmitAccountData(data: any) {
    this.userRepoService.saveUserInfo(data).pipe(
      mergeMap(el => this.userRepoService.saveUserinfo(data).pipe(
        map(el => {
          alert('Passowrd Change successfully, mobile name updated successfully');
        })
      ))
    ).subscribe();
    // forkJoin(
    //   this.userRepoService.saveUserInfo(data),
    //   this.userRepoService.saveUserinfo(data)
    // ).pipe(map(([appUser, userInfo]) => {
    //   alert('Passowrd Change successfully, mobile name updated successfully');
    // })
    // ).subscribe();
  }
  onGeneralInformationSubmit(data: any) {
    this.userRepoService.saveAppUserinfo(data).pipe().subscribe();
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
          notificationid: 0,
        }
      ],
      lastLoggin: '',
      confirmPassword: '',
      notificationid: 0
    }
  }

  // OverView
  loadOverView() {
    // get all notification
    this.userRepoService.getTimeLineConfig().pipe(
      map((timeline: INotification[]) => {
        this.timelineGrid.clear();
      this.lazyLoader.load('app-timeline', this.timelineGrid, 'timelineconfig', (cmpRef: any) => {
      if (this.store.has('timelineconfig')) {
        this.store.setIn('timelineconfig', ['timeline'], timeline);
      } else {
        this.store.add('timelineconfig', {timeline: timeline}, true);
      }
    });
      })
    ).subscribe()
    
  }
}
