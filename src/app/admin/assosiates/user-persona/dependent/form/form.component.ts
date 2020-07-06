import { Component, OnInit } from '@angular/core';
import { SimpleStoreManagerService } from '@app/shared/storemanager/storemanager.service';
import { NgForm } from '@angular/forms';
import { AppPermission, User, UserProfile } from '@app/shell/models/user.model';
import { UserPersonaFormService } from './form.service';

@Component({
  selector: 'app-page-userpersona-form',
  templateUrl: './form.component.html'
})
export class UserPersonaFormComponent implements OnInit {
  public user: UserProfile = {} as UserProfile;
  private formProductObj: any;
  public value: number = 12;
  constructor(private store: SimpleStoreManagerService, private userPersonaFrmSrv: UserPersonaFormService) {
    this.user.id = this.store.getByKey('userpersonanavigatingid');
    if (this.user.id === 0) {
      this.store.setIn('userpersonapageconfig', ['pageHeading'], 'Create');
    } else {
      this.store.setIn('userpersonapageconfig', ['pageHeading'], 'Edit');
    }
    this.store.setIn('userpersonapageconfig', ['showPageAction'], false);
  }
  onChange(event: any, mode: string) {
    let permissionIndex = this.user.permissions.filter(x => x.mode == mode);
    permissionIndex[0].permission = event ? 1 : 0;
  }
  ngOnInit() {
    if (this.user.id !== 0) {
      this.userPersonaFrmSrv.get(this.user.id, (el: UserProfile) => {
        this.user = el;
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
}
