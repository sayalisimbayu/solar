import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutModule } from '@app/core/layout/layout.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Routes, RouterModule } from '@angular/router';
import { PageIsErrorComponent } from './page-is-error.component';
const routes: Routes = [
  {
    path: '',
    component: PageIsErrorComponent
  }
];
@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes), LayoutModule, NgbModule],
  declarations: [PageIsErrorComponent]
})
export class PageIsErrorModule {}
