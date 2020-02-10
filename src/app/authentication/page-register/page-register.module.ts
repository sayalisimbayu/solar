import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutModule } from '@app/core/layout/layout.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Routes, RouterModule } from '@angular/router';
import { PageRegisterComponent } from './page-register.component';
import { FormsModule } from '@angular/forms';
import { CommonElementsModule } from '@app/core/common-elements/common-elements.module';
const routes: Routes = [
  {
    path: '',
    component: PageRegisterComponent
  }
];
@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes), FormsModule, LayoutModule, NgbModule, CommonElementsModule],
  declarations: [PageRegisterComponent]
})
export class PageRegisterModule {}
