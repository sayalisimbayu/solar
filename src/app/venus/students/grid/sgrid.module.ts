import { NgModule } from "@angular/core";
import { RouterModule, Routes } from '@angular/router';
import { SGridComponent } from './sgrid.component';
import { StudentsGridService } from './sgrid.service';
import { StudentsRepoService } from './srepo.service';
export const route: Routes = [
    {
        path: '',
        component: SGridComponent
    }
];
export const routing = RouterModule.forChild(route);
@NgModule({
    imports:[],
    declarations:[SGridComponent],
    exports:[SGridComponent],
    entryComponents: [SGridComponent],
    providers:[StudentsGridService, StudentsRepoService]
})
export class SGridModule {
    static entry = SGridComponent
}