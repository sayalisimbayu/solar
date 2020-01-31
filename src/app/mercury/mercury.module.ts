import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxEchartsModule } from 'ngx-echarts';
import { RichTextEditorAllModule } from '@syncfusion/ej2-angular-richtexteditor';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LayoutModule } from '@app/core/layout/layout.module';
import { MercuryComponent } from './mercury.component';
import { routing } from './mercury.routing';

@NgModule({
  imports: [CommonModule, routing, NgxEchartsModule, LayoutModule, RichTextEditorAllModule, NgbModule],
  declarations: [MercuryComponent]
})
export class MercuryModule {}
