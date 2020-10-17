import { CommonModule } from '@angular/common';
import { NgModule } from "@angular/core";
import { VenusComponent } from './venus.component';
import { venusRouting } from './venus.routing';
@NgModule({
    imports: [CommonModule, venusRouting],
    declarations: [VenusComponent],
    exports: [],
    providers:[]
})
export class VenusModule {
}