import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

export const routes: Routes = [
  { path: '', redirectTo: 'authentication', pathMatch: 'full' },
  { path: 'admin', loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule) },
  {
    path: 'authentication',
    loadChildren: () => import('./authentication/authentication.module').then(m => m.AuthenticationModule)
  }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes, { useHash: false });
