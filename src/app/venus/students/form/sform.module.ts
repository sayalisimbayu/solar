import { CommonModule } from '@angular/common';
import { NgModule } from "@angular/core";
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { SFormComponent } from './sform.component';
import { SFormResolver } from './sform.resolver';
import { StudentFormService } from './sform.service';
export const route: Routes = [
    {
        path: '',
        component: SFormComponent,
        resolve: {sform: SFormResolver}
    }
];
export const routing = RouterModule.forChild(route);
@NgModule({
    imports:[CommonModule, routing, NgMultiSelectDropDownModule, FormsModule, NgbModule],
    declarations:[SFormComponent],
    entryComponents:[SFormComponent],
    exports:[SFormComponent],
    providers:[SFormResolver, StudentFormService]
})
export class SFormModule {
    static entry = SFormComponent;
}