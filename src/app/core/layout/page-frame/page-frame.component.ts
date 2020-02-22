import { Component, OnInit, ChangeDetectorRef, ViewContainerRef, ViewChild, AfterViewInit, Input, OnDestroy } from '@angular/core';
import { IPageFrameConfig } from './model/page-frame.config.interface';
import { map, filter } from 'rxjs/operators';
import { LazyLoaderService } from '@app/shared/services/lazy-loader.service';
import { SimpleStoreManagerService } from '@app/shared/storemanager/storemanager.service';
import { StoreEvent } from '@app/shared/storemanager/models/storeEvent.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-page-frame',
  templateUrl: './page-frame.component.html',
  styleUrls: ['./page-frame.component.css']
})
export class PageFrameComponent implements OnInit, AfterViewInit, OnDestroy {
  @Input() storeId: string;
  @ViewChild('pagetitle', { read: ViewContainerRef, static: true })
  pageTitle: ViewContainerRef;
  @ViewChild('pagebody', { read: ViewContainerRef, static: true })
  pageBody: ViewContainerRef;
  public config?: IPageFrameConfig;
  private subscription: Subscription;
  constructor(
    private cdr: ChangeDetectorRef,
    private lazyLoader: LazyLoaderService,
    private store: SimpleStoreManagerService
  ) { }
  public removeSearchKeyword(removedKeyword: any) {
    if (this.config.searchModel != undefined) {
      if (this.config.searchModel.some(x => x.value === removedKeyword.value)) {
        this.config.searchModel.splice(this.config.searchModel.indexOf(removedKeyword), 1);
        this.config.newSearchKeywordEvent.call(this, removedKeyword, this.config.searchModel);
      }
    }
  }
  public addSearchKeyword(newKeyword: any) {
    if (this.config.searchModel == undefined) {
      this.config.searchModel = [];
    }
    this.config.searchModel.push(newKeyword);
    console.log(newKeyword);
    if (this.config.newSearchKeywordEvent !== null && this.config.newSearchKeywordEvent !== undefined) {
      this.config.newSearchKeywordEvent.call(this, newKeyword, this.config.searchModel);
    }
  }

  ngAfterViewInit(): void {
    // this.updateComponent();
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
  ngOnInit() {
    this.subscription = new Subscription();
    if (this.store.has(this.storeId)) {
      this.config = this.store.getByKey(this.storeId);
    }
    this.subscription.add(this.store.$store
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
            debugger;
            if (el.path.indexOf('pageTitle') > -1) {
              this.updatePagetTitle(el.path.slice(1), el.changedValue);
            }
          }
        })
      )
      .subscribe());
  }
  private updateComponent() {
    this.updatePagetTitle();
    this.updatePageBody();
  }
  private updatePagetTitle(changedConfingPath: string[] = [], changedValue: any = null) {
    const that = this;
    if (this.config && this.config.pageHeading) {
      if (this.pageTitle != undefined) {
        this.pageTitle.clear();
        this.lazyLoader.load('page-title', this.pageTitle, this.storeId + '_page_title', (_cdRef: any) => {
          if (!that.store.has(that.storeId + '_page_title')) {
            that.store.add(that.storeId + '_page_title', that.config.pageTitle, true);
          } else {
            if (changedValue !== null) {
              that.store.setIn(that.storeId + '_page_title', changedConfingPath, changedValue);
            } else {
              that.store.setIn(that.storeId + '_page_title', [], that.config.pageTitle);
            }
          }
          this.cdr.detectChanges();
        });
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
