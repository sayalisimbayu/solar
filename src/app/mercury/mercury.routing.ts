import { Routes, RouterModule } from '@angular/router';
import { MercuryComponent } from './mercury.component';

const routes: Routes = [
  {
    path: '',
    component: MercuryComponent,
    children: [
      { path: '', redirectTo: 'category' },
      {
        path: 'category',
        children: [
          {
            path: '',
            loadChildren: () => import('./shared/category/layout/layout.module').then(m => m.CLayoutModule),
            data: { title: ':: Simbayu :: Mercury :: Category ::' }
          }
        ]
      },
      {
        path: 'product',
        children: [
          {
            path: '',
            loadChildren: () => import('./shared/product/layout/layout.module').then(m => m.PLayoutModule),
            data: { title: ':: Simbayu :: Mercury :: Product ::' }
          }
        ]
      }
    ]
  }
];

export const routing = RouterModule.forChild(routes);
