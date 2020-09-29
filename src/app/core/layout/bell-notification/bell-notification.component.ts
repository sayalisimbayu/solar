import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnDestroy,
  ChangeDetectorRef,
  OnChanges,
  AfterViewInit
} from '@angular/core';
import { filter, map, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { ThemeService } from '@app/shared/services/theme.service';
import { UserRepoService } from '@app/shared/reposervice/user.repo.service';
import { SimpleStoreManagerService } from '@app/shared/storemanager/storemanager.service';
import { StoreEvent } from '@app/shared/storemanager/models/storeEvent.model';

@Component({
  selector: 'app-bell-notification-pane',
  templateUrl: './bell-notification.component.html',
  styleUrls: ['./bell-notification.component.scss']
})
export class BellNotificationPaneComponent implements OnDestroy, OnChanges, AfterViewInit {
  @Input() sidebarVisible: boolean = true;
  public themeClass: string = 'theme-cyan';
  private ngUnsubscribe = new Subject();
  items: any[] = [];
  timeline: any = {
    item1: []
  };
  public page = {
    pagesize: 30,
    currentPage: 0,
    throttle: 50,
    scrollDistance: 1,
    scrollUpDistance: 2
  };
  private totalRows: number = 0;

  constructor(
    private themeService: ThemeService,
    private userRepoService: UserRepoService,
    private cdRef: ChangeDetectorRef,
    private store: SimpleStoreManagerService
  ) {
    this.themeService.themeClassChange.pipe(takeUntil(this.ngUnsubscribe)).subscribe((themeClass: string) => {
      this.themeClass = themeClass;
    });
  }

  ngOnChanges() {}

  ngOnInit() {
    this.themeService.themeClassChange.pipe(takeUntil(this.ngUnsubscribe)).subscribe((themeClass: any) => {
      this.themeClass = themeClass;
    });
    this.timeline.item1 = [];
    this.loadOverView({
      pagesize: 6,
      currentPage: 0,
      throttle: 50,
      scrollDistance: 1,
      scrollUpDistance: 2
    });
    this.notificationListner();
  }
  ngAfterViewInit(): void {}

  loadOverView(event: any) {
    const that = this;
    let payload = {
      pageNumber: event.currentPage,
      pageSize: 6,
      search: '',
      orderby: ''
    };
    if (this.totalRows >= this.timeline.item1.length) {
      this.userRepoService
        .getTimeLineConfig(payload)
        .pipe(
          map((timeline: any) => {
            this.timeline.item1 = timeline.item1;
            this.timeline.item1.forEach((timel: any) => {
              this.items.push({
                label: '',
                icon: 'fa fa-calendar-plus-o',
                styleClass: 'teste',
                content: `${timel.message}`,
                title: `${timel.type}`,
                updatedDate: `${timel.updatedDate}`
              });
            });
            that.totalRows = timeline.item2;
            that.page.currentPage++;
          })
        )
        .subscribe();
    }
  }

  notificationListner() {
    this.store.$store
      .pipe(filter((se: { key: string }) => se.key === 'appNotifications'))
      .pipe(
        map((el: StoreEvent) => {
          alert('notificationlistner triggerd');
          this.loadOverView({
            pagesize: 6,
            currentPage: 0,
            throttle: 50,
            scrollDistance: 1,
            scrollUpDistance: 2
          });
        })
      )
      .subscribe();
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
