import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { CGridComponent } from './cgrid.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
const routes: Routes = [
  {
    path: '',
    component: CGridComponent
  }
];
export const routing = RouterModule.forChild(routes);
@NgModule({
  imports: [CommonModule, routing, InfiniteScrollModule],
  declarations: [CGridComponent],
  entryComponents: [CGridComponent],
  exports: [CGridComponent]
})
export class CGridLayoutModule {
  static entry = CGridComponent;
}
