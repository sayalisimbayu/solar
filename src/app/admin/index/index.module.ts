import { NgModule, ApplicationModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxEchartsModule } from 'ngx-echarts';
import { RichTextEditorAllModule } from '@syncfusion/ej2-angular-richtexteditor';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LayoutModule } from '@app/core/layout/layout.module';
import { IndexComponent } from './index.component';
import { Routes, RouterModule } from '@angular/router';
const routes: Routes = [
  {
    path: '',
    component: IndexComponent
  }
];
export const routing = RouterModule.forChild(routes);
@NgModule({
  imports: [CommonModule, routing, NgxEchartsModule, LayoutModule, RichTextEditorAllModule, NgbModule],
  declarations: [IndexComponent]
})
export class IndexModule {}
