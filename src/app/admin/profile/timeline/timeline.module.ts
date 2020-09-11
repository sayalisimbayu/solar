import { NgModule } from '@angular/core';
import { NgxVerticalTimelineModule } from 'ngx-vertical-timeline';
import { TimeLineComponent } from './timeline.component';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
// import {} from 'angular-timeline';
const routes: Routes = [
  {
    path: '',
    component: TimeLineComponent
  }
];
export const routing = RouterModule.forChild(routes);
@NgModule({
  imports: [CommonModule, routing, ReactiveFormsModule, FormsModule, NgxVerticalTimelineModule],
  declarations: [TimeLineComponent],
  entryComponents: [TimeLineComponent],
  exports: [TimeLineComponent]
})
export class TimeLineModule {
  static entry = TimeLineComponent;
}
