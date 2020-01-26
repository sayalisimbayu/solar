import { Component, OnInit, ChangeDetectorRef, ViewContainerRef, ViewChild, AfterViewInit, Input } from '@angular/core';
import { IPageFrameConfig } from './model/page-frame.config.interface';
import { map, filter } from 'rxjs/operators';
import { LazyLoaderService } from '@app/shared/services/lazy-loader.service';
import { SimpleStoreManagerService } from '@app/shared/storemanager/storemanager.service';
import { StoreEvent } from '@app/shared/storemanager/models/storeEvent.model';

@Component({
  selector: 'app-page-frame',
  templateUrl: './page-frame.component.html',
  styleUrls: ['./page-frame.component.css']
})
export class PageFrameComponent implements OnInit, AfterViewInit {
  @Input() storeId: string;
  @ViewChild('pagetitle', { read: ViewContainerRef, static: true })
  pageTitle: ViewContainerRef;
  @ViewChild('pagebody', { read: ViewContainerRef, static: true })
  pageBody: ViewContainerRef;
  public config?: IPageFrameConfig;
  constructor(
    private cdr: ChangeDetectorRef,
    private lazyLoader: LazyLoaderService,
    private store: SimpleStoreManagerService
  ) {}
  ngAfterViewInit(): void {
    // this.updateComponent();
  }
  ngOnInit() {
    if (this.store.has(this.storeId)) {
      this.config = this.store.getByKey(this.storeId);
    }
    this.store.$store
      .pipe(filter((el: StoreEvent) => el.key === this.storeId))
      .pipe(
        map((el: StoreEvent) => {
          if (el.store != undefined && el.path.length === 0) {
            this.config = el.store.value as IPageFrameConfig;
            this.updateComponent();
          } else {
            this.config = el.store.value as IPageFrameConfig;
            if (el.path.indexOf('pageBodyUrl') > -1) {
              this.updatePageBody();
            }
            if (el.path.indexOf('pageTitle') > -1) {
              this.updatePagetTitle(el.path.slice(1), el.changedValue);
            }
          }
        })
      )
      .subscribe();
  }
  private updateComponent() {
    this.updatePagetTitle();
    this.updatePageBody();
  }
  private updatePagetTitle(changedConfingPath: string[] = [], changedValue: any = null) {
    const that = this;
    if (this.config && this.config.pageHeading) {
      if (this.pageTitle != undefined) {
        if (!that.store.has(that.storeId + '_page_title')) {
          this.pageTitle.clear();
          this.lazyLoader.load('page-title', this.pageTitle, this.storeId + '_page_title', (_cdRef: any) => {
            that.store.add(that.storeId + '_page_title', that.config.pageTitle, true);
          });
        } else {
          this.store.setIn(this.storeId + '_page_title', changedConfingPath, changedValue);
        }
      }
    }
  }
  private updatePageBody() {
    if (this.pageBody != undefined) {
      this.pageBody.clear();
      if (this.config && this.config.pageBodyUrl) {
        this.lazyLoader.load(this.config.pageBodyUrl, this.pageBody);
      }
    }
  }
}
