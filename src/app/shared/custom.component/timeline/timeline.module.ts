import { NgModule } from '@angular/core';
import { TimelineComponent } from './timeline.component';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
const routes: Routes = [
  {
    path: '',
    component: TimelineComponent
  }
];
export const routing = RouterModule.forChild(routes);
@NgModule({
  imports: [CommonModule, routing],
  declarations: [TimelineComponent],
  providers: [],
  entryComponents: [TimelineComponent],
  exports: [TimelineComponent]
})
export class TimelineModule {
  static entry = TimelineComponent;
}
