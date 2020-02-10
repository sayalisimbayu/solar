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
    this.basicInformation = this.setBasicInformationFormBuilder();
    this.accountData = this.setaccountDataFormBuilder();
    // getUserInfo
    this.getUserInfo();
  }
  ngAfterViewInit(): void {
    this.loadPageTitle();
   
    this.userRepoService.getUserSetting().subscribe(el => {
      alert('got setting');
      console.log(el);
      this.userSetting = el;
    });
  }
  getUserInfo() {
    this.userRepoService.getUserInfo().subscribe(el => {
      alert('got info');
      console.log(el);
      debugger
      // set userInfo this.userInfo = el
      this.userInfo = {
        id: 0,
        usid: 0,
        firstname: 'Amar',
        lastname: 'Barge',
        mobile: '8082071188',
        gender: true,
        birthdate: this.birthDate,
        social: 'amar.fb',
        addresslinE1: 'Address1',
        addresslinE2: 'Address2',
        city: 'cotton green',
        ustate: 'maharashtra',
        countrycode: 'IN',
      }

      // set user
      debugger
      this.user = this.setUser(this.userInfo);

      // set value for mobile
      this.basicInformation.controls['mobile'].setValue(this.userInfo.mobile);

      // set account data
      this.accountData.setValue(this.setUpdatedaccountData(this.userInfo, this.user));
    });
  }
  setBasicInformationFormBuilder(): FormGroup {
      return this.formBuilder.group({
      id:[0],
      usid: [1],
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      username: [''],
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
      newpassword: [''],
      confirmnewpassword: ['']
    });
  }
  setaccountDataFormBuilder(): FormGroup {
      return this.formBuilder.group({
      id:[0],
      usid: [0],
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      username: [''],
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
      newpassword: [''],
      confirmnewpassword: ['']
    });
  }
  setUpdatedaccountData(userInfo: UserInfo, user: User) {
    debugger
    return {
      id: userInfo.id,
      usid: userInfo.usid,
      firstname: userInfo.firstname,
      lastname: userInfo.lastname,
      username: user.username,
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
      newpassword: '',
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
    debugger;
    this.submitted = true;
    if (this.basicInformation.invalid) {
      return;
    }
    this.basicInformation.value['gender'] = this.basicInformation.value['gender']
    .toString().toLowerCase() === 'true' ? true : false;

    this.userRepoService.saveUserinfo(data).subscribe(el => {
      debugger;
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
      this.accountData.setValue(el);
      (el.gender) ? this.basicInformation.controls['gender'].setValue('true') :
      this.basicInformation.controls['gender'].setValue('false')
      // this.userInfo = el;
    });
    console.log('userInfo',this.basicInformation.value);
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
}
