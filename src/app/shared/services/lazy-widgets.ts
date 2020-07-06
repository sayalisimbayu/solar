import { NgModuleFactory, Type } from '@angular/core';

export const lazyWidgets: {
  path: string;
  loadChildren: () => Promise<NgModuleFactory<any> | Type<any>>;
  data: any;
}[] = [
  {
    path: 'app-detail-tiles',
    loadChildren: () =>
      import('./../../admin/assosiates/detail-tiles/detail-tiles.module').then(m => m.DetailTilesModule),
    data: { preload: true }
  },
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
  }
  // {
  //   path: 'category-grid',
  //   loadChildren: () =>
  //     import('./../pages/page-category-grid/category-grid/category-grid.module').then(m => m.CategoryGridModule),
  //   data: { preload: true }
  // }
];

export function lazyArrayToObj() {
  const result = {};
  for (const w of lazyWidgets) {
    result[w.path] = w.loadChildren;
  }
  return result;
}
