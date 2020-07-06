import {
  OnInit,
  Component,
  AfterViewInit,
  OnDestroy,
  Input,
  ChangeDetectorRef,
  ViewChild,
  ViewContainerRef,
  ElementRef,
  TemplateRef
} from '@angular/core';
import { AutoUnsubscribe } from '@app/shared/decoraters/decorators';
import { INotification } from '@app/shell/models/noti.model';
import { SimpleStoreManagerService } from '@app/shared/storemanager/storemanager.service';
import { filter, map } from 'rxjs/operators';
import { StoreEvent } from '@app/shared/storemanager/models/storeEvent.model';
@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html'
  // styleUrls: ['./timeline.component.scss']
})
@AutoUnsubscribe()
export class TimelineComponent implements OnInit, AfterViewInit, OnDestroy {
  @Input() storeId: string;
  public config: INotification[];
  public pagebody$: any;

  @ViewChild('timelinecontainer', { read: ViewContainerRef, static: true }) timelineContainer: ViewContainerRef;
  @ViewChild('timelinetemplate', { read: TemplateRef, static: true }) timelineTemplate: TemplateRef<any>;
  constructor(private store: SimpleStoreManagerService, private cdref: ChangeDetectorRef) {}

  ngOnInit(): void {
    debugger;
    console.log('storeId', this.storeId);
    this.pagebody$ = this.store.$store
      .pipe(filter((se: { key: string }) => se.key === this.storeId))
      .pipe(
        map((el: StoreEvent) => {
          // if (el.path.length === 0 || (el.path.length === 1 && el.path.indexOf(this.storeId) > -1)) {
          this.config = el.store.value.timeline;
          this.cdref.detectChanges();
          this.timelineContainer.clear();
          this.config.forEach((_config: INotification) => {
            this.loadTimeline(_config);
          });
          // this.loadButtons();
          // }
          // this.store.setIn('categorypageconfig', ['pageHeading'], el.store.value.pageTitle);
          // this.store.setIn('categorypageconfig', ['pageBodyUrl'], el.store.value.pageBodyUrl);
        })
      )
      .subscribe();
  }

  loadTimeline(config: INotification) {
    this.timelineContainer.createEmbeddedView(this.timelineTemplate, { config });
  }

  ngAfterViewInit(): void {}

  ngOnDestroy(): void {}
}
