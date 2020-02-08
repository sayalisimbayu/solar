import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ProfileComponent } from './profile.component';
import { ReactiveFormsModule } from '@angular/forms';
const routes: Routes = [
  {
    path: '',
    component: ProfileComponent
  }
];
export const routing = RouterModule.forChild(routes);
@NgModule({
  imports: [CommonModule, routing, ReactiveFormsModule],
  declarations: [ProfileComponent],
  entryComponents: [ProfileComponent],
  exports: [ProfileComponent]
})
export class ProfileModule {
  static entry = ProfileComponent;
}
