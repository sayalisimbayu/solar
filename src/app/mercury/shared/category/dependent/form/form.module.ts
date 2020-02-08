import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { CategoryFormComponent } from './form.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
const routes: Routes = [
  {
    path: '',
    component: CategoryFormComponent
  }
];
export const routing = RouterModule.forChild(routes);
@NgModule({
  imports: [CommonModule, routing, NgMultiSelectDropDownModule, FormsModule, NgbModule],
  declarations: [CategoryFormComponent],
  entryComponents: [CategoryFormComponent],
  exports: [CategoryFormComponent]
})
export class CFormLayoutModule {
  static entry = CategoryFormComponent;
}
