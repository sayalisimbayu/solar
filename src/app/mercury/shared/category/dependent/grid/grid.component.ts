import { Component, ViewChild, ViewContainerRef, AfterViewInit, OnInit, OnDestroy } from '@angular/core';
import { SimpleStoreManagerService } from '@app/shared/storemanager/storemanager.service';
import { LazyLoaderService } from '@app/shared/services/lazy-loader.service';
import { CategoryGridService } from './grid.service';
import { ICGridConfig } from '@app/shared/custom.component/cgrid/config/config';
import { ExportService } from '@app/shared/services/export.service';

@Component({
  selector: 'app-page-category-grid',
  templateUrl: './grid.component.html'
})

export class CategoryGridComponent implements AfterViewInit, OnInit, OnDestroy {
  @ViewChild('pageGrid', { read: ViewContainerRef, static: true })
  pageGrid: ViewContainerRef;

  public selector = '.scrollable-container';

  constructor(private store: SimpleStoreManagerService,
    private lazyLoader: LazyLoaderService,
    private catGridSrv: CategoryGridService,
    private exportSrv: ExportService) {

  }

  ngAfterViewInit(): void {
    this.store.setIn('categorypageconfig', ['showPageAction'], true);
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
    this.store.setIn('categorypageconfig', ['defaultPageAction'],
      { action: this.createNew.bind(this), title: 'Create New' });
    this.store.setIn('categorypageconfig', ['pageActions'], [
      {
        title: 'Export',
        action: this.export.bind(this)
      }
    ]);

  }
  createNew(event: any) {
    this.store.add('categorynavigatingid', 0, true);
    this.catGridSrv.navigateToForm();
  }
  export(event: any) {
    const gridConfig = this.store.getByKey('categorypagegridconfig') as ICGridConfig
    this.exportSrv.exportToCsv('Category Data.csv', gridConfig.items, ['name']);
  }
  ngOnDestroy() {
  }
}
