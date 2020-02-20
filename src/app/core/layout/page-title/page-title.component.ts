import {
  OnInit,
  ChangeDetectorRef,
  Input,
  Component,
  ChangeDetectionStrategy,
  ViewChild,
  ViewContainerRef,
  AfterViewInit,
  OnDestroy
} from '@angular/core';
import { IPageTitleConfig } from './model/page-title.config.interface';
import { map, filter } from 'rxjs/operators';
import { SidebarService } from '@app/shared/services/sidebar.service';
import { LazyLoaderService } from '@app/shared/services/lazy-loader.service';
import { SimpleStoreManagerService } from '@app/shared/storemanager/storemanager.service';
import { StoreEvent } from '@app/shared/storemanager/models/storeEvent.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-page-title',
  templateUrl: './page-title.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PageTitleComponent implements OnInit, AfterViewInit,OnDestroy {
  public sidebarVisible = true;
  @ViewChild('container', { read: ViewContainerRef, static: true })
  container: ViewContainerRef;
  @Input() storeId: string;
  @Input() scope: any;
  public config: IPageTitleConfig;
  public subScription: Subscription;
  constructor(
    private sidebarService: SidebarService,
    private cdr: ChangeDetectorRef,
    private lazyLoader: LazyLoaderService,
    private store: SimpleStoreManagerService
  ) { 
    this.subScription=new Subscription();
  }
  ngAfterViewInit(): void {
    // this.loadComponent();
  }
  ngOnDestroy(){
    this.subScription.unsubscribe();
  }
  ngOnInit() {
    if (this.store.has(this.storeId)) {
      this.config = this.store.getByKey(this.storeId);
    }
    this.subScription.add(this.store.$store
      .pipe(filter((el: StoreEvent) => el.key === this.storeId))
      .pipe(
        map((el: StoreEvent) => {
          debugger;
          this.config = el.store.value as IPageTitleConfig;
          if (this.config !== null) {
            console.info(this.config);
            if (el.path.length === 0 || el.path.indexOf('leftComponentUrl') > -1) {
              this.loadComponent();
            }
            this.cdr.detectChanges();
          }
        })
      )
      .subscribe());
  }
  toggleFullWidth() {
    this.sidebarService.toggle();
    this.sidebarVisible = this.sidebarService.getStatus();
    this.cdr.detectChanges();
  }
  private loadComponent() {
    if (this.config && this.config.leftComponentUrl) {
      this.container.clear();
      this.lazyLoader.load(this.config.leftComponentUrl, this.container, (cmpRef: any) => {
        // cmpRef.changeDetectorRef.detectChanges();
        // that.cdr.detectChanges();
      });
    }
  }
}
