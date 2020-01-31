import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { LoginActivate } from './shared/other/authGuard';

export const routes: Routes = [
  { path: '', redirectTo: 'admin', pathMatch: 'full' },
  {
    path: 'admin',
    loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule),
    canActivate: [LoginActivate]
  },
  {
    path: 'mercury',
    loadChildren: () => import('./mercury/mercury.module').then(m => m.MercuryModule),
    canActivate: [LoginActivate]
  },
  {
    path: 'authentication',
    loadChildren: () => import('./authentication/authentication.module').then(m => m.AuthenticationModule)
  }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes, { useHash: false });
