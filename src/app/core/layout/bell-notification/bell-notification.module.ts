import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { BellNotificationPaneComponent } from './bell-notification.component';
const routes: Routes = [
  {
    path: '',
    component: BellNotificationPaneComponent
  }
];
export const routing = RouterModule.forChild(routes);
@NgModule({
  imports: [CommonModule, routing],
  declarations: [BellNotificationPaneComponent],
  entryComponents: [BellNotificationPaneComponent],
  exports: [BellNotificationPaneComponent]
})
export class BellNotificationModule {
  static entry = BellNotificationPaneComponent;
}
