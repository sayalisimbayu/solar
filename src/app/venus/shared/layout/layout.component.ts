import { Component, ViewChild, ViewContainerRef, AfterViewInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IPageFrameConfig } from '@app/core/layout/page-frame/model/page-frame.config.interface';
import { LazyLoaderService } from '@app/shared/services/lazy-loader.service';
import { SimpleStoreManagerService } from '@app/shared/storemanager/storemanager.service';
@Component({
    selector:'app-layout',
    templateUrl: './layout.component.html',
    styleUrls: ['./layout.component.scss']
})
export class VenusLayoutComponent implements AfterViewInit, OnDestroy {
 @ViewChild('pageframe', { read: ViewContainerRef, static: true })
  pageFrame: ViewContainerRef;
  private PageFrameConfig: IPageFrameConfig;
  constructor(
    private lazyLoader: LazyLoaderService,
    private store: SimpleStoreManagerService,
    private route: ActivatedRoute
    ) {}
  ngAfterViewInit(): void {
    this.PageFrameConfig = this.route.snapshot.data.config;
    this.loadPageFrame();
  }
  loadPageFrame(){
    this.destroyConatiner();
    this.lazyLoader.load('page-frame', this.pageFrame, this.route.snapshot.data.config.store['pageconfig'], (cmpRef: any) => {
      (!this.store.has(this.route.snapshot.data.config.store['pageconfig'])) ? (this.store.add(this.route.snapshot.data.config.store['pageconfig'], this.PageFrameConfig)) : (this.store.setIn(this.route.snapshot.data.config.store['pageconfig'], [], this.PageFrameConfig));
      cmpRef.changeDetectorRef.detectChanges();
    });
  }
  destroyConatiner(){(this.pageFrame && this.pageFrame.length> 0)&&(this.pageFrame.clear())};
  destroyDml(){
    this.store.remove(this.route.snapshot.data.config.store['pageconfig']);
    this.store.remove(this.route.snapshot.data.config.store['navigatingId'])
}
  ngOnDestroy() {
    this.destroyConatiner();
    this.destroyDml();
  }
}