import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { CategoryGridComponent } from './grid.component';
const routes: Routes = [
  {
    path: '',
    component: CategoryGridComponent
  }
];
export const routing = RouterModule.forChild(routes);
@NgModule({
  imports: [CommonModule, routing],
  declarations: [CategoryGridComponent],
  entryComponents: [CategoryGridComponent],
  exports: [CategoryGridComponent]
})
export class CGridLayoutModule {
  static entry = CategoryGridComponent;
}
