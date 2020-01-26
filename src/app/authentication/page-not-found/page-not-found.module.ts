import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutModule } from '@app/core/layout/layout.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Routes, RouterModule } from '@angular/router';
import { PageNotFoundComponent } from './page-not-found.component';
const routes: Routes = [
  {
    path: '',
    component: PageNotFoundComponent
  }
];
@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes), LayoutModule, NgbModule],
  declarations: [PageNotFoundComponent]
})
export class PageNotFoundModule {}
