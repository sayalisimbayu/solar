import { Component, ViewEncapsulation, ChangeDetectorRef } from '@angular/core';
import { SimpleStoreManagerService } from '@app/shared/storemanager/storemanager.service';
import { UserRepoService } from '@app/shared/reposervice/user.repo.service';
import { map, takeUntil } from 'rxjs/operators';
import { INotification } from '@app/shell/models/noti.model';
import { ThemeService } from '@app/shared/services/theme.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-timelineChart',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class TimeLineComponent {
  items: any[] = [];
  externalVariable = 'hello';
  timeline: any = {
    item1: []
  };
  scrollDistance: number = 1;
  throttle: number = 50;
  private totalRows: number = 0;
  public page = {
    pagesize: 30,
    currentPage: 0,
    throttle: 50,
    scrollDistance: 1,
    scrollUpDistance: 2
  };
  private ngUnsubscribe = new Subject();
  public themeClass: string = 'theme-cyan';
  constructor(
    private store: SimpleStoreManagerService,
    private userRepoService: UserRepoService,
    private cdRef: ChangeDetectorRef,
    private themeService: ThemeService
  ) {}
  ngOnInit() {
    this.themeService.themeClassChange.pipe(takeUntil(this.ngUnsubscribe)).subscribe((themeClass: any) => {
      this.themeClass = themeClass;
    });
    this.timeline.item1 = [];
    this.loadOverView({
      pagesize: 30,
      currentPage: 0,
      throttle: 50,
      scrollDistance: 1,
      scrollUpDistance: 2
    });
  }
  onTimeLineScroll(event: any) {
    this.loadOverView(event);
  }
  loadOverView(event: any) {
    const that = this;
    debugger;
    let payload = {
      pageNumber: event.currentPage,
      pageSize: 10,
      search: '',
      orderby: 'UpdatedDate desc'
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
            this.cdRef.detectChanges();
          })
        )
        .subscribe();
    }
  }
}
