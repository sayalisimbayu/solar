import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ProfileComponent } from './profile.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ImageUploaderComponent } from './image-uploader.component';
const routes: Routes = [
  {
    path: '',
    component: ProfileComponent
  }
];
export const routing = RouterModule.forChild(routes);
@NgModule({
  imports: [CommonModule, routing, ReactiveFormsModule, FormsModule],
  declarations: [ProfileComponent, ImageUploaderComponent],
  entryComponents: [ProfileComponent],
  exports: [ProfileComponent]
})
export class ProfileModule {
  static entry = ProfileComponent;
}
