import { CommonModule } from '@angular/common';
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { RegestrationService } from './registration-form-service';
import { RegistrationFormComponent } from './registration-form.component';
import { RegistrationFormResolver } from './registration-form.resolver';
export const registrationFormRoute: Routes = [
    {
        path: '',
        component: RegistrationFormComponent,
        resolve: {resgistration: RegistrationFormResolver}
    }
];
export const registrationFormRouting = RouterModule.forChild(registrationFormRoute);
@NgModule({
    imports: [CommonModule, registrationFormRouting, ReactiveFormsModule],
    declarations:[RegistrationFormComponent],
    exports:[],
    providers:[RegistrationFormResolver, RegestrationService]
})
export class RegestrationFormModule {
    static entryservice = RegestrationService
}