import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { TimeLineComponent } from './timeline.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
const routes: Routes = [
  {
    path: '',
    component: TimeLineComponent
  }
];
export const routing = RouterModule.forChild(routes);
@NgModule({
  imports: [CommonModule, routing, InfiniteScrollModule],
  declarations: [TimeLineComponent],
  entryComponents: [TimeLineComponent],
  exports: [TimeLineComponent]
})
export class TimeLineModule {
  static entry = TimeLineComponent;
}
