import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutModule } from '@app/core/layout/layout.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Routes, RouterModule } from '@angular/router';
import { PageTryLaterComponent } from './page-try-later.component';
const routes: Routes = [
  {
    path: '',
    component: PageTryLaterComponent
  }
];
@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes), LayoutModule, NgbModule],
  declarations: [PageTryLaterComponent]
})
export class PageTryLaterModule {}
