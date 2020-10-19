import { RouterModule, Routes } from '@angular/router';
import { sForm, sGrid } from './shared/constants/students.constant';
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
            },
            {
                path: 'students',
                children: [
                    {
                        path: '',
                        loadChildren: ()=>import('./shared/layout/layout.module').then(m=>m.VenusLayoutModule),
                        data: { title: ':: Simbayu :: Venus :: Students ::', config: sGrid }
                    }
                ]
            }
        ]
    }
];
export const venusRouting = RouterModule.forChild(venusRoutes);