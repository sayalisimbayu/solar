import { NgModule } from '@angular/core';
import { GCComponent } from './gc.component';
import { CommonModule } from '@angular/common';
import { NgxEchartsModule } from 'ngx-echarts';

@NgModule({
  imports: [CommonModule, NgxEchartsModule],
  declarations: [GCComponent],
  entryComponents: [GCComponent]
})
export class GCModule {
  static entry = GCComponent;
}
