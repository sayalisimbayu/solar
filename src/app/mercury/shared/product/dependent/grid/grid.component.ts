import { Component, ViewChild, ViewContainerRef, AfterViewInit, OnInit, OnDestroy } from '@angular/core';
import { SimpleStoreManagerService } from '@app/shared/storemanager/storemanager.service';
import { LazyLoaderService } from '@app/shared/services/lazy-loader.service';
import { ICGridConfig } from '@app/shared/custom.component/cgrid/config/config';
import { ExportService } from '@app/shared/services/export.service';
import { ProductGridService } from './grid.service';

@Component({
  selector: 'app-page-product-grid',
  templateUrl: './grid.component.html'
})
export class ProductGridComponent implements AfterViewInit, OnInit, OnDestroy {
  @ViewChild('pageGrid', { read: ViewContainerRef, static: true })
  pageGrid: ViewContainerRef;

  public selector = '.scrollable-container';

  constructor(
    private store: SimpleStoreManagerService,
    private lazyLoader: LazyLoaderService,
    private prodGridSrv: ProductGridService,
    private exportSrv: ExportService
  ) {}

  ngAfterViewInit(): void {
    this.store.setIn('productpageconfig', ['showPageAction'], true);
    this.store.setIn('productpageconfig', ['showSearchBar'], true);
    this.pageGrid.clear();
    this.lazyLoader.load('app-c-grid', this.pageGrid, 'productpagegridconfig', (cmpRef: any) => {
      if (this.store.has('productpagegridconfig')) {
        this.store.setIn('productpagegridconfig', [], this.prodGridSrv.pageGridConfig);
        this.prodGridSrv.getLatestPage(this.prodGridSrv.pageGridConfig.page);
      } else {
        this.store.add('productpagegridconfig', this.prodGridSrv.pageGridConfig);
        this.prodGridSrv.getLatestPage(this.prodGridSrv.pageGridConfig.page);
      }
    });
  }
  ngOnInit() {
    if (this.store.has('productpagegridconfig')) {
      this.store.setIn('productpagegridconfig', ['items'], []);
    }
    this.store.setIn('productpageconfig', ['pageHeading'], 'Grid');
    this.store.setIn('productpageconfig', ['defaultPageAction'], {
      action: this.createNew.bind(this),
      title: 'Create New'
    });
    this.store.setIn('productpageconfig', ['newSearchKeywordEvent'], this.searchKeyword.bind(this));
    this.store.setIn(
      'productpageconfig',
      ['pageActions'],
      [
        {
          title: 'Export',
          action: this.export.bind(this)
        }
      ]
    );
  }
  createNew(event: any) {
    this.store.add('productnavigatingid', 0, true);
    this.prodGridSrv.navigateToForm();
  }
  export(event: any) {
    const gridConfig = this.store.getByKey('productpagegridconfig') as ICGridConfig;
    this.exportSrv.exportToCsv('Product Data.csv', gridConfig.items, ['name', 'subheader', 'price']);
  }
  searchKeyword(event: any, keyModel: any) {
    console.log(event);
    let search = '';
    // if (event.value.indexOf('Name') < 0) {
    //   search = 'Name=\'' + event.value + '\'';
    // } else {
    //   search = event.value;
    // }
    let first = true;
    if (keyModel !== undefined) {
      keyModel.forEach((element: any) => {
        const eachkeyword = element.value;
        if (eachkeyword.indexOf('Name') < 0) {
          if (first) {
            search += " Name='" + eachkeyword + "'";
          } else {
            search += " or Name='" + eachkeyword + "'";
          }
        } else {
          if (first) {
            search += eachkeyword;
          } else {
            search += ' or ' + eachkeyword;
          }
        }
        first = false;
      });
    } else {
      search = undefined;
    }
    this.prodGridSrv.pageGridConfig.page.currentPage = 0;
    this.prodGridSrv.pageGridConfig.items = [];
    this.prodGridSrv.getLatestPage(this.prodGridSrv.pageGridConfig.page, search);
  }
  ngOnDestroy() {
    this.store.setIn('productpageconfig', ['showPageAction'], false);
    this.store.setIn('productpageconfig', ['showSearchBar'], false);
    this.store.remove('productpagegridconfig');
    this.store.setIn('productpageconfig', ['defaultPageAction'], {});
    this.store.setIn('productpageconfig', ['newSearchKeywordEvent'], null);
    this.store.setIn('productpageconfig', ['pageActions'], []);
  }
}
