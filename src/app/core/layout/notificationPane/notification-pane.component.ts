import { Component, Input, OnDestroy, ChangeDetectorRef, ViewContainerRef, ViewChild, OnChanges, AfterViewInit } from '@angular/core';
import { LazyLoaderService } from '@app/shared/services/lazy-loader.service';

@Component({
  selector: 'app-notification-pane',
  templateUrl: './notification-pane.component.html',
  styleUrls: ['./notification-pane.component.scss']
})
export class NotificationPaneComponent implements OnDestroy, OnChanges, AfterViewInit {
  @Input() sidebarVisible: boolean = false;
  @ViewChild('appbellnotificationpane', { read: ViewContainerRef, static: true })
  appbellnotificationpane: ViewContainerRef;
  constructor(private lazyLoader: LazyLoaderService) {}

  ngOnChanges() {
    if(this.sidebarVisible){
    this.appbellnotificationpane.clear();
    this.lazyLoader.load('app-bell-notification-pane', this.appbellnotificationpane, 'profile_page_title', (_cdRef: any) => {
    });
    } else {
      this.appbellnotificationpane.clear();
    }
  }
  ngOnInit() {}
  ngAfterViewInit(): void {
    if(this.sidebarVisible){
      this.appbellnotificationpane.clear();
      this.lazyLoader.load('app-bell-notification-pane', this.appbellnotificationpane, 'profile_page_title', (_cdRef: any) => {
      });
      } else {
        this.appbellnotificationpane.clear();
      }

  }
  ngOnDestroy() {}
}
