import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutModule } from '@app/core/layout/layout.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Routes, RouterModule } from '@angular/router';
import { PageForbiddonErrorComponent } from './page-forbiddon-error.component';
const routes: Routes = [
  {
    path: '',
    component: PageForbiddonErrorComponent
  }
];
@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes), LayoutModule, NgbModule],
  declarations: [PageForbiddonErrorComponent]
})
export class PageForbiddonErrorModule {}
