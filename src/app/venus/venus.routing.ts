import { RouterModule, Routes } from '@angular/router';
import { VenusComponent } from './venus.component';

export const venusRoutes: Routes = [
    {
        path: '',
        component: VenusComponent,
        children: [
            {path: '', redirectTo:'registration'},
            {
                path: 'registration',
                children: [
                    {
                        path: '',
                        loadChildren: ()=>import('./registration-form/registration-form.module').then(m => m.RegestrationFormModule)
                    }
                ]
            }
        ]
    }
];
export const venusRouting = RouterModule.forChild(venusRoutes);