import { CommonModule } from '@angular/common';
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from '@angular/router';
import { VenusLayoutComponent } from './layout.component';
export const venusLayoutRoute: Routes = [
    {
        path: '',
        component: VenusLayoutComponent
    }
];
export const venusLayoutRouting = RouterModule.forChild(venusLayoutRoute);
@NgModule({
    imports:[CommonModule, venusLayoutRouting],
    declarations:[VenusLayoutComponent],
    entryComponents: [VenusLayoutComponent],
    exports:[VenusLayoutComponent],
    providers:[]
})

export class VenusLayoutModule {
    static entry = VenusLayoutComponent;
}