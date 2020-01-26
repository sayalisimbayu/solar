import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutModule } from '@app/core/layout/layout.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Routes, RouterModule } from '@angular/router';
import { PageLoginComponent } from './page-login.component';
import { FormsModule } from '@angular/forms';
const routes: Routes = [
  {
    path: '',
    component: PageLoginComponent
  }
];
@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes), LayoutModule, FormsModule, NgbModule],
  declarations: [PageLoginComponent]
})
export class PageLoginModule {}
