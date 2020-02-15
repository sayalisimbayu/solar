import { Component, ViewChild, ViewContainerRef, AfterViewInit, OnInit, OnDestroy } from '@angular/core';
import { SimpleStoreManagerService } from '@app/shared/storemanager/storemanager.service';
import { LazyLoaderService } from '@app/shared/services/lazy-loader.service';
import { CategoryGridService } from './grid.service';

@Component({
  selector: 'app-page-category-grid',
  templateUrl: './grid.component.html'
})

export class CategoryGridComponent implements AfterViewInit, OnInit, OnDestroy {
  @ViewChild('pageGrid', { read: ViewContainerRef, static: true })
  pageGrid: ViewContainerRef;

  public selector: string = '.scrollable-container';

  constructor(private store: SimpleStoreManagerService,
    private lazyLoader: LazyLoaderService,
    private catGridSrv: CategoryGridService) {
  }

  ngAfterViewInit(): void {
    this.pageGrid.clear();
    this.lazyLoader.load('app-c-grid', this.pageGrid, 'categorypagegridconfig', (cmpRef: any) => {
      if (this.store.has('categorypagegridconfig')) {
        this.store.setIn('categorypagegridconfig', [], this.catGridSrv.pageGridConfig);
        this.catGridSrv.getLatestPage(this.catGridSrv.pageGridConfig.page);
      } else {
        this.store.add('categorypagegridconfig', this.catGridSrv.pageGridConfig);
        this.catGridSrv.getLatestPage(this.catGridSrv.pageGridConfig.page);
      }
    });
  }
  ngOnInit() {
  }
  ngOnDestroy() {
  }
}
