import { Component, ViewChild, ViewContainerRef, AfterViewInit, OnInit, OnDestroy, ViewEncapsulation, Input } from '@angular/core';
import { SimpleStoreManagerService } from '@app/shared/storemanager/storemanager.service';
import { LazyLoaderService } from '@app/shared/services/lazy-loader.service';
import { StudentsGridService } from './sgrid.service';
import { ICGridConfig } from '@app/shared/custom.component/cgrid/config/config';
import { ExportService } from '@app/shared/services/export.service';
import { sGrid } from '@app/venus/shared/constants/students.constant';

@Component({
    selector: 'app-sgrid',
    templateUrl: 'sgrid.component.html',
    styleUrls: ['./sgrid.component.scss'],
    encapsulation: ViewEncapsulation.None
})

export class SGridComponent implements OnInit, OnDestroy, AfterViewInit {
    @ViewChild('pageGrid', { read: ViewContainerRef, static: true })
    pageGrid: ViewContainerRef;
    config: any;
    constructor(
      private store: SimpleStoreManagerService,
      private lazyLoader: LazyLoaderService,
      private studentsGridSrv: StudentsGridService,
      private exportSrv: ExportService
    ) {}
    ngAfterViewInit(): void {
      this.store.setIn(this.config.store['pageconfig'], ['showPageAction'], true);
      this.store.setIn(this.config.store['pageconfig'], ['showSearchBar'], true);
      this.pageGrid.clear();
      this.lazyLoader.load('app-c-grid', this.pageGrid, this.config.store['gridpageconfig'], (cmpRef: any) => {
        if (this.store.has(this.config.store['gridpageconfig'])) {
          this.store.setIn(this.config.store['gridpageconfig'], [], this.studentsGridSrv.pageGridConfig);
          this.studentsGridSrv.getLatestPage(this.studentsGridSrv.pageGridConfig.page);
        } else {
          this.store.add(this.config.store['gridpageconfig'], this.studentsGridSrv.pageGridConfig);
          this.studentsGridSrv.getLatestPage(this.studentsGridSrv.pageGridConfig.page);
        }
      });
    }
    ngOnInit() {
      this.config = sGrid;
      this.store.setIn(this.config.store['pageconfig'], ['pageHeading'], 'Grid');
      this.store.setIn(this.config.store['pageconfig'], ['defaultPageAction'], {
        action: this.createNew.bind(this),
        title: 'Create New'
      });
      this.store.setIn(this.config.store['pageconfig'], ['newSearchKeywordEvent'], this.searchKeyword.bind(this));
      this.store.setIn(
        this.config.store['pageconfig'],
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
      this.store.add(this.config.store['navigatingId'], 0, true);
      this.studentsGridSrv.navigateToForm();
    }
    export(event: any) {
      const gridConfig = this.store.getByKey(this.config.store['gridpageconfig']) as ICGridConfig;
      this.exportSrv.exportToCsv('Category Data.csv', gridConfig.items, ['name']);
    }
    searchKeyword(event: any, keyModel: any) {
      console.log(event);
      let search = '';
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
      this.studentsGridSrv.pageGridConfig.page.currentPage = 0;
      this.studentsGridSrv.pageGridConfig.items = [];
      this.studentsGridSrv.getLatestPage(this.studentsGridSrv.pageGridConfig.page, search);
    }
    ngOnDestroy() {
      this.store.setIn(this.config.store['pageconfig'], ['showPageAction'], false);
      this.store.setIn(this.config.store['pageconfig'], ['showSearchBar'], false);
      this.store.remove(this.config.store['gridpageconfig']);
      this.store.setIn(this.config.store['pageconfig'], ['defaultPageAction'], {});
      this.store.setIn(this.config.store['pageconfig'], ['newSearchKeywordEvent'], null);
      this.store.setIn(this.config.store['pageconfig'], ['pageActions'], []);
    }
}