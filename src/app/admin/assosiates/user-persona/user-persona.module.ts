import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { UserPersonaComponent } from './user-persona.component';
const routes: Routes = [
  {
    path: '',
    component: UserPersonaComponent
  }
];
export const routing = RouterModule.forChild(routes);
@NgModule({
  imports: [CommonModule, routing],
  declarations: [UserPersonaComponent],
  entryComponents: [UserPersonaComponent],
  exports: [UserPersonaComponent]
})
export class UserPersonaModule {
  static entry = UserPersonaComponent;
}
