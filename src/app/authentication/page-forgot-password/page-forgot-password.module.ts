import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutModule } from '@app/core/layout/layout.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Routes, RouterModule } from '@angular/router';
import { PageForgotPasswordComponent } from './page-forgot-password.component';
import { FormsModule } from '@angular/forms';
const routes: Routes = [
  {
    path: '',
    component: PageForgotPasswordComponent
  }
];
@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes), FormsModule, LayoutModule, NgbModule],
  declarations: [PageForgotPasswordComponent]
})
export class PageForgotPasswordModule {}
