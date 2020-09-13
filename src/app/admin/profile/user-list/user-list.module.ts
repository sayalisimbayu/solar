import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { UserListComponent } from './user-list.component';
const routes: Routes = [
  {
    path: '',
    component: UserListComponent
  }
];
export const routing = RouterModule.forChild(routes);
@NgModule({
  imports: [CommonModule, routing],
  declarations: [UserListComponent],
  entryComponents: [UserListComponent],
  exports: [UserListComponent]
})
export class UserListModule {
  static entry = UserListComponent;
}
