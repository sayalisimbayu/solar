import { Component, OnInit, ViewChild, ViewContainerRef, AfterViewInit, OnDestroy } from '@angular/core';
import { EChartOption } from 'echarts';
import { IPageFrameConfig } from '@app/core/layout/page-frame/model/page-frame.config.interface';
import { LazyLoaderService } from '@app/shared/services/lazy-loader.service';
import { SimpleStoreManagerService } from '@app/shared/storemanager/storemanager.service';

@Component({
  selector: 'app-user-persona',
  templateUrl: './user-persona.component.html',
  styleUrls: ['./user-persona.component.scss']
})
export class UserPersonaComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('pageframe', { read: ViewContainerRef, static: true })
  pageFrame: ViewContainerRef;
  public pagebody$: any;
  public visitorsOptions: EChartOption = {};
  public visitsOptions: EChartOption = {};
  public sidebarVisible = true;
  private PageFrameConfig: IPageFrameConfig;
  constructor(private lazyLoader: LazyLoaderService, private store: SimpleStoreManagerService) {

  }

  ngOnInit() { }
  ngAfterViewInit(): void {
    const that = this;
    // Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    // Add 'implements AfterViewInit' to the class.
    this.PageFrameConfig = {
      pageBodyUrl: 'app-page-userpersona-grid',
      pageHeading: 'User Persona Grid',
      showSearchBar: false,
      pageTitle: {
        breadCrumb: [
          {
            title: 'Dashboard',
            url: 'admin/dashboard/index',
            clickable: false
          },
          {
            title: 'User Persona',
            url: '',
            clickable: false
          }
        ],
        leftComponentUrl: 'page-header-chart',
        pageTitle: 'User Persona'
      },
      showPageAction: false
    };

    this.pageFrame.clear();
    this.lazyLoader.load('page-frame', this.pageFrame, 'userpersonapageconfig', (cmpRef: any) => {
      if (!this.store.has('userpersonapageconfig')) {
        this.store.add('userpersonapageconfig', this.PageFrameConfig);
      } else {
        this.store.setIn('userpersonapageconfig', [], this.PageFrameConfig);
      }
      cmpRef.changeDetectorRef.detectChanges();
    });
  }
  ngOnDestroy() {
    this.store.remove('userpersonapageconfig');
    this.store.remove('userpersonanavigatingid');
  }
}
