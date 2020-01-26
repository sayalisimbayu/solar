import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutModule } from '@app/core/layout/layout.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Routes, RouterModule } from '@angular/router';
import { PageLockscreenComponent } from './page-lockscreen.component';
import { FormsModule } from '@angular/forms';
const routes: Routes = [
  {
    path: '',
    component: PageLockscreenComponent
  }
];
@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes), FormsModule, LayoutModule, NgbModule],
  declarations: [PageLockscreenComponent]
})
export class PageLockscreenModule {}
