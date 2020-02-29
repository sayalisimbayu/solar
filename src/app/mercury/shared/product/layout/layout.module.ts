import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PLayoutComponent } from './layout.component';
import { Routes, RouterModule } from '@angular/router';
const routes: Routes = [
  {
    path: '',
    component: PLayoutComponent
  }
];
export const routing = RouterModule.forChild(routes);
@NgModule({
  imports: [CommonModule, routing],
  declarations: [PLayoutComponent],
  entryComponents: [PLayoutComponent],
  exports: [PLayoutComponent]
})
export class PLayoutModule {
  static entry = PLayoutComponent;
}
