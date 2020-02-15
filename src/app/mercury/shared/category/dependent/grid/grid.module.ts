import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { CategoryGridComponent } from './grid.component';
import { CategoryGridService } from './grid.service';
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
  exports: [CategoryGridComponent],
  providers:[CategoryGridService]
})
export class CGridLayoutModule {
  static entry = CategoryGridComponent;
}
