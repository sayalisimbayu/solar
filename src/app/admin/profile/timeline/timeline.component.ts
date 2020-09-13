import { Component, ViewEncapsulation, ChangeDetectorRef } from '@angular/core';
import { SimpleStoreManagerService } from '@app/shared/storemanager/storemanager.service';
import { UserRepoService } from '@app/shared/reposervice/user.repo.service';
import { map } from 'rxjs/operators';
import { INotification } from '@app/shell/models/noti.model';

@Component({
  selector: 'app-timelineChart',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class TimeLineComponent {
  items: any[] = [];
  externalVariable = 'hello';
  timeline: any ={
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
  }
  constructor(
    private store: SimpleStoreManagerService,
    private userRepoService: UserRepoService,
    private cdRef: ChangeDetectorRef
    ) {}
  ngOnInit() {
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
    let payload = {
      pageNumber: event.currentPage,
      pageSize: 10,
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
              title: `${timel.type}`
            });
          });
          that.totalRows = timeline.item2;
          that.page.currentPage++;
          this.cdRef.detectChanges();
        })
      ).subscribe();
    }
  }
}
