import { Component, OnInit, ViewChild, ViewContainerRef, TemplateRef } from '@angular/core';
import { SimpleStoreManagerService } from '@app/shared/storemanager/storemanager.service';
import { NgForm } from '@angular/forms';
import { AppPermission, User, UserProfile } from '@app/shell/models/user.model';
import { UserPersonaFormService } from './form.service';
import { LazyLoaderService } from '@app/shared/services/lazy-loader.service';

@Component({
  selector: 'app-page-userpersona-form',
  templateUrl: './form.component.html'
})
export class UserPersonaFormComponent implements OnInit {
  public user: UserProfile = {} as UserProfile;
  private formProductObj: any;
  public value: number = 12;
  // @ViewChild('SwitchContainer', { read: ViewContainerRef, static: true }) SwitchContainerRef: ViewContainerRef;
  @ViewChild('Switch', { read: ViewContainerRef, static: true }) SwitchRef: ViewContainerRef;
  constructor(
    private store: SimpleStoreManagerService,
    private userPersonaFrmSrv: UserPersonaFormService,
    private lazyLoader: LazyLoaderService
  ) {
    this.user.id = this.store.getByKey('userpersonanavigatingid');
    if (this.user.id === 0) {
      this.store.setIn('userpersonapageconfig', ['pageHeading'], 'Create');
    } else {
      this.store.setIn('userpersonapageconfig', ['pageHeading'], 'Edit');
    }
    this.store.setIn('userpersonapageconfig', ['showPageAction'], false);
  }
  onChange(event: any, mode: string, config: any) {
    let permissionIndex = this.user.permissions.filter(x => x.mode == mode);
    permissionIndex[0].permission = event ? 1 : 0;
  }
  ngOnInit() {
    if (this.user.id !== 0) {
      this.userPersonaFrmSrv.get(this.user.id, (el: UserProfile) => {
        this.user = el;
        this.InitializeSwitchComponent();
      });
    }
  }
  onSubmit(form: NgForm) {
    this.formProductObj = form;

    if (form.valid) {
      this.userPersonaFrmSrv.save(this.user.permissions, (el: any) => {
        if (this.user.id === 0) {
          if (this.formProductObj != null) {
            this.formProductObj.resetForm();
          }
          this.user = {} as UserProfile;
        }
      });
    }
    return true;
  }
  onCancel($event: any) {
    this.store.setIn('userpersonapageconfig', ['pageBodyUrl'], 'app-page-userpersona-grid');
  }

  InitializeSwitchComponent() {
    // this.SwitchRef.clear();
    if (this.user.permissions && this.user.permissions.length > 0) {
      this.user.permissions.forEach((permission: any) => {
        let switchConfig = {
          cssClass: '',
          size: 'small',
          isChecked: permission.permission == 1 ? true : false,
          type: permission.mode,
          title: permission.alias,
          description: permission.description,
          events: {
            onChange: this.onChange.bind(this)
          }
        };
        // this.pageGrid.clear();
        this.lazyLoader.load('app-switch', this.SwitchRef, switchConfig, (cmpRef: any) => {
          // if (this.store.has('productpagegridconfig')) {
          //   this.store.setIn('productpagegridconfig', [], this.prodGridSrv.pageGridConfig);
          //   this.prodGridSrv.getLatestPage(this.prodGridSrv.pageGridConfig.page);
          // } else {
          //   this.store.add('productpagegridconfig', this.prodGridSrv.pageGridConfig);
          //   this.prodGridSrv.getLatestPage(this.prodGridSrv.pageGridConfig.page);
          // }
        });
      });
    }
  }
}
