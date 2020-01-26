import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthenticationComponent } from './authentication/authentication.component';
import { routing } from './authentication.routing';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [AuthenticationComponent],
  imports: [CommonModule, routing, RouterModule, FormsModule]
})
export class AuthenticationModule {}
