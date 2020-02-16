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
  constructor(private store: SimpleStoreManagerService,
    private categoryFrmSrv: CategoryFormService) {
    this.category.id = this.store.getByKey('categorynavigatingid');
    if (this.category.id === 0) {
      this.store.setIn('categorypageconfig', ['pageHeading'], 'Create Category Form');
    }
    else {
      this.store.setIn('categorypageconfig', ['pageHeading'], 'Edit Category Form');
    }
    this.store.setIn('categorypageconfig', ['showPageAction'], false);

  }
  ngOnInit() {

    if (this.category.id !== 0) {
      this.categoryFrmSrv.get(this.category.id, this.setCatgory.bind(this));
    }
  }
  setCatgory(el: Category) {
    if (el !== null) {
      this.category = el;
    } else {
      this.category = this.categoryFrmSrv.generateNew();
    }
  }
  onSubmit(form: NgForm) {
    if (form.valid) {
      this.categoryFrmSrv.save(this.category, this.setCatgory.bind(this));
      form.resetForm();
    }
    return true;
  }
  onCancel($event: any) {
    this.store.setIn('categorypageconfig', ['pageHeading'], 'Category Grid');
    this.store.setIn('categorypageconfig', ['pageBodyUrl'], 'app-category-grid');
  }
}
