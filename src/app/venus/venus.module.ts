import { CommonModule } from '@angular/common';
import { NgModule } from "@angular/core";
import { LayoutModule } from '@app/core/layout/layout.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RichTextEditorAllModule } from '@syncfusion/ej2-angular-richtexteditor';
import { NgxEchartsModule } from 'ngx-echarts';
import { VenusComponent } from './venus.component';
import { venusRouting } from './venus.routing';
@NgModule({
    imports: [CommonModule, venusRouting, NgxEchartsModule, LayoutModule, RichTextEditorAllModule, NgbModule],
    declarations: [VenusComponent],
    exports: [],
    providers:[]
})
export class VenusModule {
}