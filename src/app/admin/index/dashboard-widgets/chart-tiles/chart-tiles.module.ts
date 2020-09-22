import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxEchartsModule } from 'ngx-echarts';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LayoutModule } from '@app/core/layout/layout.module';
import { Routes, RouterModule } from '@angular/router';
import { ChartTilesComponent } from './chart-tiles.component';
const routes: Routes = [
  {
    path: '',
    component: ChartTilesComponent
  }
];
export const routing = RouterModule.forChild(routes);
@NgModule({
  imports: [CommonModule, routing, NgxEchartsModule, LayoutModule, NgbModule],
  declarations: [ChartTilesComponent]
})
export class ChartTilesModule {
  static entry = ChartTilesComponent;
}
