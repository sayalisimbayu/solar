import { Component, ViewChild, ViewContainerRef, AfterViewInit, OnInit, OnDestroy } from '@angular/core';
import { SimpleStoreManagerService } from '@app/shared/storemanager/storemanager.service';
import { LazyLoaderService } from '@app/shared/services/lazy-loader.service';
import { ICGridConfig } from '@app/shared/custom.component/cgrid/config/config';
import { ExportService } from '@app/shared/services/export.service';
import { UserPersonaGridService } from './grid.service';

@Component({
  selector: 'app-page-userpersona-grid',
  templateUrl: './grid.component.html'
})

export class UserPersonaGridComponent implements AfterViewInit, OnInit, OnDestroy {
  @ViewChild('pageGrid', { read: ViewContainerRef, static: true })
  pageGrid: ViewContainerRef;

  public selector = '.scrollable-container';

  constructor(private store: SimpleStoreManagerService,
    private lazyLoader: LazyLoaderService,
    private userPersonaGridSrv: UserPersonaGridService,
    private exportSrv: ExportService) {

  }

  ngAfterViewInit(): void {
    this.store.setIn('userpersonapageconfig', ['showPageAction'], true);
    this.store.setIn('userpersonapageconfig', ['showSearchBar'], true);
    this.pageGrid.clear();
    this.lazyLoader.load('app-c-grid', this.pageGrid, 'userpersonapagegridconfig', (cmpRef: any) => {
      if (this.store.has('userpersonapagegridconfig')) {
        this.store.setIn('userpersonapagegridconfig', [], this.userPersonaGridSrv.pageGridConfig);
        this.userPersonaGridSrv.getLatestPage(this.userPersonaGridSrv.pageGridConfig.page);
      } else {
        this.store.add('userpersonapagegridconfig', this.userPersonaGridSrv.pageGridConfig);
        this.userPersonaGridSrv.getLatestPage(this.userPersonaGridSrv.pageGridConfig.page);
      }
    });
  }
  ngOnInit() {
    if (this.store.has('userpersonapagegridconfig')) {
      this.store.setIn('userpersonapagegridconfig', ['items'], []);
    }
    this.store.setIn('userpersonapageconfig', ['pageHeading'], 'Grid');
    this.store.setIn('userpersonapageconfig', ['defaultPageAction'],
      { action: this.createNew.bind(this), title: 'Create New' });
    this.store.setIn('userpersonapageconfig', ['newSearchKeywordEvent'], this.searchKeyword.bind(this));
    this.store.setIn('userpersonapageconfig', ['pageActions'], [
      {
        title: 'Export',
        action: this.export.bind(this)
      }
    ]);

  }
  createNew(event: any) {
    this.store.add('userpersonanavigatingid', 0, true);
    this.userPersonaGridSrv.navigateToForm();
  }
  export(event: any) {
    const gridConfig = this.store.getByKey('userpersonapagegridconfig') as ICGridConfig
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
            search += ' Name=\'' + eachkeyword + '\'';
          } else {
            search += ' or Name=\'' + eachkeyword + '\'';
          }
        }
        else {
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
    this.userPersonaGridSrv.pageGridConfig.page.currentPage = 0;
    this.userPersonaGridSrv.pageGridConfig.items = [];
    this.userPersonaGridSrv.getLatestPage(this.userPersonaGridSrv.pageGridConfig.page, search);
  }
  ngOnDestroy() {
    this.store.setIn('userpersonapageconfig', ['showPageAction'], false);
    this.store.setIn('userpersonapageconfig', ['showSearchBar'], false);
    this.store.remove('userpersonapagegridconfig');
    this.store.setIn('userpersonapageconfig', ['defaultPageAction'],
      {});
    this.store.setIn('userpersonapageconfig', ['newSearchKeywordEvent'], null);
    this.store.setIn('userpersonapageconfig', ['pageActions'], []);

  }
}
