import { NgModule } from '@angular/core';
import { TimeLineComponent } from './timeline.component';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
const routes: Routes = [
  {
    path: '',
    component: TimeLineComponent
  }
];
export const routing = RouterModule.forChild(routes);
@NgModule({
  imports: [CommonModule, routing],
  declarations: [TimeLineComponent],
  entryComponents: [TimeLineComponent],
  exports: [TimeLineComponent]
})
export class TimeLineModule {
  static entry = TimeLineComponent;
}
