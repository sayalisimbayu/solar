import { Component, OnInit, ViewChild, ViewContainerRef, AfterViewInit, OnDestroy } from '@angular/core';
import { IPageFrameConfig } from '@app/core/layout/page-frame/model/page-frame.config.interface';
import { LazyLoaderService } from '@app/shared/services/lazy-loader.service';
import { SimpleStoreManagerService } from '@app/shared/storemanager/storemanager.service';

@Component({
  selector: 'app-prod-layout',
  templateUrl: './layout.component.html',
})
export class PLayoutComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('pageframe', { read: ViewContainerRef, static: true })
  pageFrame: ViewContainerRef;
  public pagebody$: any;
  public sidebarVisible = true;
  private PageFrameConfig: IPageFrameConfig;
  constructor(private lazyLoader: LazyLoaderService, private store: SimpleStoreManagerService) {
    // this.pagebody$ = this.store.$store
    // .pipe(filter((se: { key: string }) => se.key === 'category-form-path'))
    // .pipe(
    //   map((el: StoreEvent) => {
    //     // this.store.setIn('categorypageconfig', ['pageHeading'], el.store.value.pageTitle);
    //     // this.store.setIn('categorypageconfig', ['pageBodyUrl'], el.store.value.pageBodyUrl);
    //   })
    // )
    // .subscribe();
  }

  ngOnInit() { }
  ngAfterViewInit(): void {
    const that = this;
    // Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    // Add 'implements AfterViewInit' to the class.
    this.PageFrameConfig = {
      pageBodyUrl: 'app-product-grid',
      pageHeading: 'Product Grid',
      showSearchBar: false,
      pageTitle: {
        breadCrumb: [
          {
            title: 'Dashboard',
            url: 'admin/dashboard/index',
            clickable: false
          },
          {
            title: 'Product',
            url: '',
            clickable: false
          }
        ],
        leftComponentUrl: 'page-header-chart',
        pageTitle: 'Product'
      },
      showPageAction: false
    };

    this.pageFrame.clear();
    this.lazyLoader.load('page-frame', this.pageFrame, 'productpageconfig', (cmpRef: any) => {
      if (!this.store.has('productpageconfig')) {
        this.store.add('productpageconfig', this.PageFrameConfig);
      } else {
        this.store.setIn('productpageconfig', [], this.PageFrameConfig);
      }
      cmpRef.changeDetectorRef.detectChanges();
    });
  }
  ngOnDestroy() {
    this.store.remove('productpageconfig');
    this.store.remove('productnavigatingid');
  }
}
