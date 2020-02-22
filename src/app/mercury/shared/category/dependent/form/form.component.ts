import { Component, OnInit } from '@angular/core';
import { SimpleStoreManagerService } from '@app/shared/storemanager/storemanager.service';
import { Category } from '@app/shell/models/category.model';
import { CategoryFormService } from './form.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-page-category-form',
  templateUrl: './form.component.html'
})
export class CategoryFormComponent implements OnInit {
  public category = {} as Category;
  private formCategoryObj: any;
  constructor(private store: SimpleStoreManagerService,
    private categoryFrmSrv: CategoryFormService) {
    this.category.id = this.store.getByKey('categorynavigatingid');
    if (this.category.id === 0) {
      this.store.setIn('categorypageconfig', ['pageHeading'], 'Create');
    }
    else {
      this.store.setIn('categorypageconfig', ['pageHeading'], 'Edit');
    }
    this.store.setIn('categorypageconfig', ['showPageAction'], false);

  }
  ngOnInit() {

    if (this.category.id !== 0) {
      this.categoryFrmSrv.get(this.category.id, (el: Category) => {
        this.category = el;
      });
    }
  }
  onSubmit(form: NgForm) {
    this.formCategoryObj = form;
    if (form.valid) {
      this.categoryFrmSrv.save(this.category, (el: any) => {
        if (this.category.id === 0) {
          if (this.formCategoryObj != null) {
            this.formCategoryObj.resetForm();
          }
          this.category = this.categoryFrmSrv.generateNew();
        }
      });
    }
    return true;
  }
  onCancel($event: any) {
    this.store.setIn('categorypageconfig', ['pageBodyUrl'], 'app-category-grid');
  }
}
