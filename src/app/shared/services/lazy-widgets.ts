import { NgModuleFactory, Type } from '@angular/core';

export const lazyWidgets: {
  path: string;
  loadChildren: () => Promise<NgModuleFactory<any> | Type<any>>;
  data: any;
}[] = [
  {
    path: 'page-header-chart',
    loadChildren: () => import('./../../core/layout/page-title/general-component/gc.module').then(m => m.GCModule),
    data: { preload: true }
  },
  {
    path: 'page-title',
    loadChildren: () => import('./../../core/layout/page-title/page-title.module').then(m => m.PageTitleModule),
    data: { preload: true }
  },
  {
    path: 'page-frame',
    loadChildren: () => import('./../../core/layout/page-frame/page-frame.module').then(m => m.PageFrameModule),
    data: { preload: true }
  },
  {
    path: 'app-category-grid',
    loadChildren: () =>
      import('./../../mercury/shared/category/dependent/grid/grid.module').then(m => m.CGridLayoutModule),
    data: { preload: true }
  },
  {
    path: 'app-category-form',
    loadChildren: () =>
      import('./../../mercury/shared/category/dependent/form/form.module').then(m => m.CFormLayoutModule),
    data: { preload: true }
  },
  {
    path: 'app-product-grid',
    loadChildren: () =>
      import('./../../mercury/shared/product/dependent/grid/grid.module').then(m => m.PGridLayoutModule),
    data: { preload: true }
  },
  {
    path: 'app-product-form',
    loadChildren: () =>
      import('./../../mercury/shared/product/dependent/form/form.module').then(m => m.PFormLayoutModule),
    data: { preload: true }
  },
  {
    path: 'app-c-grid',
    loadChildren: () => import('./../custom.component/cgrid/cgrid.module').then(m => m.CGridLayoutModule),
    data: { preload: true }
  },
  {
    path: 'app-page-userpersona-grid',
    loadChildren: () =>
      import('./../../admin/assosiates/user-persona/dependent/grid/grid.module').then(m => m.UPGridLayoutModule),
    data: { preload: true }
  },
  {
    path: 'app-page-userpersona-form',
    loadChildren: () =>
      import('./../../admin/assosiates/user-persona/dependent/form/form.module').then(m => m.UPFormLayoutModule),
    data: { preload: true }
  },
  {
    path: 'app-switch',
    loadChildren: () => import('./../switch/switch.module').then(m => m.SwitchModule),
    data: { preload: true }
  },
  {
    path: 'app-timelineChart',
    loadChildren: () => import('./../../admin/profile/timeline/timeline.module').then(m => m.TimeLineModule),
    data: { preload: true }
  },
  {
    path: 'app-user-list',
    loadChildren: () => import('./../../admin/profile/user-list/user-list.module').then(m => m.UserListModule),
    data: { preload: true }
  },
  {
    path: 'app-detail-titles',
    loadChildren: () =>
      import('./../../admin/index/dashboard-widgets/detail-tiles/detail-tiles.module').then(m => m.DetailTilesModule),
    data: { preload: true }
  },
  {
    path: 'app-chart-tiles',
    loadChildren: () =>
      import('./../../admin/index/dashboard-widgets/chart-tiles/chart-tiles.module').then(m => m.ChartTilesModule),
    data: { preload: true }
  },
  {
    path: 'app-dashboard-grid',
    loadChildren: () =>
      import('./../../admin/index/dashboard-widgets/dashboard-grid/dashboard-grid.module').then(
        m => m.DashboardGridModule
      ),
    data: { preload: true }
  },
  {
    path: 'app-bell-notification-pane',
    loadChildren: () =>
      import('./../../core/layout/bell-notification/bell-notification.module').then(m => m.BellNotificationModule),
    data: { preload: true }
  },
  {
    path: 'registration',
    loadChildren: () =>
      import('../../venus/registration-form/registration-form.module').then(m => m.RegestrationFormModule),
    data: { preload: true }
  },
  {
    path: 'app-sgrid',
    loadChildren: ()=>
    import('../../venus/students/grid/sgrid.module').then(m=>m.SGridModule),
    data:{preload: true}
  },
  {
    path: 'app-sform',
    loadChildren: ()=>
    import('../../venus/students/form/sform.module').then(m=>m.SFormModule),
    data: {preload: true}
  }
];

export function lazyArrayToObj() {
  const result = {};
  for (const w of lazyWidgets) {
    result[w.path] = w.loadChildren;
  }
  return result;
}
