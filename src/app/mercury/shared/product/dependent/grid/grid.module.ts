import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ProductGridComponent } from './grid.component';
import { ProductGridService } from './grid.service';
const routes: Routes = [
  {
    path: '',
    component: ProductGridComponent
  }
];
export const routing = RouterModule.forChild(routes);
@NgModule({
  imports: [CommonModule, routing],
  declarations: [ProductGridComponent],
  entryComponents: [ProductGridComponent],
  exports: [ProductGridComponent],
  providers: [ProductGridService]
})
export class PGridLayoutModule {
  static entry = ProductGridComponent;
}
