import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CLayoutComponent } from './layout.component';
import { Routes, RouterModule } from '@angular/router';
const routes: Routes = [
    {
        path: '',
        component: CLayoutComponent
    }
];
export const routing = RouterModule.forChild(routes);
@NgModule({
    imports: [CommonModule, routing],
    declarations: [CLayoutComponent],
    entryComponents: [CLayoutComponent],
    exports: [CLayoutComponent]
})
export class CLayoutModule {
    static entry = CLayoutComponent;
}
