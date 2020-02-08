import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthenticationComponent } from './authentication/authentication.component';
import { routing } from './authentication.routing';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [AuthenticationComponent],
  imports: [CommonModule, routing, RouterModule, FormsModule, NgbModule]
})
export class AuthenticationModule {}
