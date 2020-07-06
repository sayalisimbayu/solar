import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { UserPersonaFormComponent } from './form.component';
import { UserPersonaFormService } from './form.service';
import { UiSwitchModule } from 'ngx-ui-switch';

const routes: Routes = [
  {
    path: '',
    component: UserPersonaFormComponent
  }
];
export const routing = RouterModule.forChild(routes);
@NgModule({
  imports: [CommonModule, routing, NgMultiSelectDropDownModule, FormsModule, NgbModule, UiSwitchModule],
  declarations: [UserPersonaFormComponent],
  entryComponents: [UserPersonaFormComponent],
  exports: [UserPersonaFormComponent],
  providers: [UserPersonaFormService]
})
export class UPFormLayoutModule {
  static entry = UserPersonaFormComponent;
}
