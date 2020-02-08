import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { CGridComponent } from './cgrid.component';
const routes: Routes = [
  {
    path: '',
    component: CGridComponent
  }
];
export const routing = RouterModule.forChild(routes);
@NgModule({
  imports: [CommonModule, routing],
  declarations: [CGridComponent],
  entryComponents: [CGridComponent],
  exports: [CGridComponent]
})
export class CGridLayoutModule {
  static entry = CGridComponent;
}
