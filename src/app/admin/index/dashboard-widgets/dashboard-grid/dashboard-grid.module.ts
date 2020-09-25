import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LayoutModule } from '@app/core/layout/layout.module';
import { Routes, RouterModule } from '@angular/router';
import { DashboardGridComponent } from './dashboard-grid.component';
import { DynamicTile } from '../dynamic-tiles/dynamic-tile.component';
const routes: Routes = [
  {
    path: '',
    component: DashboardGridComponent
  }
];
export const routing = RouterModule.forChild(routes);
@NgModule({
  imports: [CommonModule, routing, LayoutModule, NgbModule],
  declarations: [DashboardGridComponent, DynamicTile]
})
export class DashboardGridModule {
  static entry = DashboardGridComponent;
}
