import { Component, OnInit } from '@angular/core';
import { SimpleStoreManagerService } from '@app/shared/storemanager/storemanager.service';
import { NgForm } from '@angular/forms';
import { AppPermission, User } from '@app/shell/models/user.model';
import { UserPersonaFormService } from './form.service';
import { Options } from 'ng5-slider';

@Component({
    selector: 'app-page-userpersona-form',
    templateUrl: './form.component.html'
})
export class UserPersonaFormComponent implements OnInit {
    public user: User = {} as User;
    private formProductObj: any;
    public value: number = 12;
    public options: Options = {
        floor: 0,
        ceil: 4,
        showTicks: true,
        showTicksValues: true,
        showSelectionBar: true,
        translate: (value: number): string => {
            if(value==0){
                return 'No Access';
            }
            else if (value == 1) {
                return 'View';
            }
            else if (value == 2) {
                return 'Read';
            }
            else if (value == 3) {
                return 'Write';
            }
            else if (value == 4) {
                return 'Full';
            }
            return '$' + value;
        },
        getSelectionBarColor: (value: number): string => {
            if (value <= 0) {
                return 'red';
            }
            if (value <= 1) {
                return 'orange';
            }
            if (value <= 2) {
                return 'yellow';
            }
            if (value <= 3) {
                return 'blue';
            }
            return '#2AE02A';
        }
    };
    constructor(private store: SimpleStoreManagerService,
        private userPersonaFrmSrv: UserPersonaFormService) {
        this.user.id = this.store.getByKey('userpersonanavigatingid');
        if (this.user.id === 0) {
            this.store.setIn('userpersonapageconfig', ['pageHeading'], 'Create');
        }
        else {
            this.store.setIn('userpersonapageconfig', ['pageHeading'], 'Edit');
        }
        this.store.setIn('userpersonapageconfig', ['showPageAction'], false);

    }
    ngOnInit() {

        if (this.user.id !== 0) {
            debugger;
            this.userPersonaFrmSrv.get(this.user.id, (el: User) => {
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
                    this.user = {} as User;
                }
            });
        }
        return true;
    }
    onCancel($event: any) {
        this.store.setIn('userpersonapageconfig', ['pageBodyUrl'], 'app-page-userpersona-grid');
    }
}
