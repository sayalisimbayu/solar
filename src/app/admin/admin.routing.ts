import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './admin/admin.component';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      { path: '', redirectTo: 'dashboard' },
      {
        path: 'dashboard',
        children: [
          { path: '', redirectTo: 'index', pathMatch: 'full' },
          {
            path: 'index',
            loadChildren: () => import('./index/index.module').then(m => m.IndexModule),
            data: { title: ':: Lucid Angular :: Dashboard :: Analytical ::' }
          }
        ]
      }
    ]
  }
];

export const routing = RouterModule.forChild(routes);
