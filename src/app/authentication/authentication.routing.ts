import { Routes, RouterModule } from '@angular/router';
import { AuthenticationComponent } from './authentication/authentication.component';

const routes: Routes = [
  {
    path: '',
    component: AuthenticationComponent,
    children: [
      { path: '', redirectTo: 'page-login', pathMatch: 'full' },
      {
        path: 'page-login',
        loadChildren: () => import('./page-login/page-login.module').then(m => m.PageLoginModule),
        data: { title: 'Login :: Lucid Angular' }
      },
      {
        path: 'page-register',
        loadChildren: () => import('./page-register/page-register.module').then(m => m.PageRegisterModule),
        data: { title: 'Register :: Lucid Angular' }
      },
      {
        path: 'page-lockscreen',
        loadChildren: () => import('./page-lockscreen/page-lockscreen.module').then(m => m.PageLockscreenModule),
        data: { title: 'Lock Screen :: Lucid Angular' }
      },
      {
        path: 'page-forgot-password',
        loadChildren: () =>
          import('./page-forgot-password/page-forgot-password.module').then(m => m.PageForgotPasswordModule),
        data: { title: 'Forgot Password :: Lucid Angular' }
      },
      {
        path: 'page-404',
        loadChildren: () => import('./page-not-found/page-not-found.module').then(m => m.PageNotFoundModule),
        data: { title: 'Page-404 :: Lucid Angular' }
      },
      {
        path: 'page-403',
        loadChildren: () =>
          import('./page-forbiddon-error/page-forbiddon-error.module').then(m => m.PageForbiddonErrorModule),
        data: { title: 'Page-403 :: Lucid Angular' }
      },
      {
        path: 'page-500',
        loadChildren: () => import('./page-is-error/page-is-error.module').then(m => m.PageIsErrorModule),
        data: { title: 'Page-500 :: Lucid Angular' }
      },
      {
        path: 'page-503',
        loadChildren: () => import('./page-try-later/page-try-later.module').then(m => m.PageTryLaterModule),
        data: { title: 'Page-503 :: Lucid Angular' }
      }
    ]
  }
];

export const routing = RouterModule.forChild(routes);
