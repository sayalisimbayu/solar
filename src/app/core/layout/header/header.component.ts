import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectorRef } from '@angular/core';
import { NgbDropdownConfig } from '@ng-bootstrap/ng-bootstrap';
import { ThemeService } from '@app/shared/services/theme.service';
import { Router } from '@angular/router';
import { AuthService } from '@app/shell/auth/auth.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { NotificationPaneService } from '@app/shared/services/notificationPaneService';
import { SidebarService } from '@app/shared/services/sidebar.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  providers: [NgbDropdownConfig]
})
export class HeaderComponent implements OnInit {
  // Properties
  @Input() showNotifMenu: boolean = false;
  @Input() showToggleMenu: boolean = false;
  @Input() darkClass: string = '';
  @Output() toggleSettingDropMenuEvent = new EventEmitter();
  @Output() toggleNotificationDropMenuEvent = new EventEmitter();
  public notificationPaneVisible: boolean = false;

  // theme
  private ngUnsubscribe = new Subject();
  public themeClass: string = 'theme-cyan';
  constructor(
    private config: NgbDropdownConfig,
    private themeService: ThemeService,
    private router: Router,
    private authSvc: AuthService,
    public notificationPaneService: NotificationPaneService,
    private cdr: ChangeDetectorRef,
  ) {
    config.placement = 'bottom-right';

    this.themeService.themeClassChange.pipe(takeUntil(this.ngUnsubscribe)).subscribe((themeClass: any) => {
      this.themeClass = themeClass;
    });
  }

  ngOnInit() {}

  public logout() {
    this.authSvc.logout();
  }

  toggleSettingDropMenu() {
    this.toggleSettingDropMenuEvent.emit();
  }

  toggleNotificationDropMenu() {
    this.toggleNotificationDropMenuEvent.emit();
  }

  toggleSideMenu() {
    this.themeService.showHideMenu();
  }

  toggleNotificationFullWidth() {
    this.notificationPaneService.toggle();
    this.notificationPaneVisible = this.notificationPaneService.getStatus();
    (this.notificationPaneVisible) && (this.notificationPaneService.notificationBadge = 0, this.notificationPaneService.notificationBadgeBlink = '');
    this.cdr.detectChanges();
  }

}
