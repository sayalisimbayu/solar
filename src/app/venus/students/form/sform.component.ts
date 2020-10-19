import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { SimpleStoreManagerService } from '@app/shared/storemanager/storemanager.service';
import { Category } from '@app/shell/models/category.model';
import { StudentFormService } from './sform.service';
import { NgForm } from '@angular/forms';
@Component({
    selector: 'app-sform',
    templateUrl: 'sform.component.html',
    styleUrls: ['./sform.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class SFormComponent implements OnInit, OnDestroy {
    public category = {} as Category;
    private formCategoryObj: any;
    constructor(private store: SimpleStoreManagerService, private studentFrmSrv: StudentFormService) {
      this.category.id = this.store.getByKey('studentsNavigatingId');
      if (this.category.id === 0) {
        this.store.setIn('studentspageconfig', ['pageHeading'], 'Create');
      } else {
        this.store.setIn('studentspageconfig', ['pageHeading'], 'Edit');
      }
      this.store.setIn('studentspageconfig', ['showPageAction'], false);
    }
    ngOnInit() {
      if (this.category.id !== 0) {
        this.studentFrmSrv.get(this.category.id, (el: Category) => {
          this.category = el;
        });
      }
    }
    onSubmit(form: NgForm) {
      this.formCategoryObj = form;
      if (form.valid) {
        this.studentFrmSrv.save(this.category, (el: any) => {
          if (this.category.id === 0) {
            if (this.formCategoryObj != null) {
              this.formCategoryObj.resetForm();
            }
            this.category = this.studentFrmSrv.generateNew();
          }
        });
      }
      return true;
    }
    onCancel($event: any) {
      this.store.setIn('studentspageconfig', ['pageBodyUrl'], 'app-sgrid');
    }
    ngOnDestroy() {}
}