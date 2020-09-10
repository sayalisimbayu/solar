import { NgModule } from '@angular/core';
import { UserListComponent } from './user-list.component';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
const routes: Routes = [
    {
      path: '',
      component: UserListComponent
    }
  ];
  export const routing = RouterModule.forChild(routes);
@NgModule({
  imports:      [ CommonModule, routing, ReactiveFormsModule, FormsModule, InfiniteScrollModule],
  declarations: [ UserListComponent ],
  entryComponents: [UserListComponent],
  exports: [UserListComponent]
})
export class UserListModule {
    static entry = UserListComponent;
}
