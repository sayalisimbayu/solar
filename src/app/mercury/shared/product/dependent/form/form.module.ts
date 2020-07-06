import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ProductFormComponent } from './form.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ProductFormService } from './form.service';
const routes: Routes = [
  {
    path: '',
    component: ProductFormComponent
  }
];
export const routing = RouterModule.forChild(routes);
@NgModule({
  imports: [CommonModule, routing, NgMultiSelectDropDownModule, FormsModule, NgbModule],
  declarations: [ProductFormComponent],
  entryComponents: [ProductFormComponent],
  exports: [ProductFormComponent],
  providers: [ProductFormService]
})
export class PFormLayoutModule {
  static entry = ProductFormComponent;
}
