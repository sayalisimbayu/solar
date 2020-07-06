import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { UserPersonaGridComponent } from './grid.component';
import { UserPersonaGridService } from './grid.service';
const routes: Routes = [
  {
    path: '',
    component: UserPersonaGridComponent
  }
];
export const routing = RouterModule.forChild(routes);
@NgModule({
  imports: [CommonModule, routing],
  declarations: [UserPersonaGridComponent],
  entryComponents: [UserPersonaGridComponent],
  exports: [UserPersonaGridComponent],
  providers: [UserPersonaGridService]
})
export class UPGridLayoutModule {
  static entry = UserPersonaGridComponent;
}
