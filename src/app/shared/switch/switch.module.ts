import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { SwitchComponent } from './switch.component';
import { UiSwitchModule } from 'ngx-ui-switch';
const routes: Routes = [
  {
    path: '',
    component: SwitchComponent
  }
];
export const routing = RouterModule.forChild(routes);
@NgModule({
  imports: [CommonModule, routing, UiSwitchModule],
  declarations: [SwitchComponent],
  entryComponents: [SwitchComponent],
  exports: [SwitchComponent]
})
export class SwitchModule {
  static entry = SwitchComponent;
}
