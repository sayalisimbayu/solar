import { Component, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { ThemeService } from '@app/shared/services/theme.service';
import { AuthService } from '@app/shell/auth/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnDestroy {
  @Input() sidebarVisible: boolean = true;
  @Input() navTab: string = 'menu';
  @Input() currentActiveMenu: any;
  @Input() currentActiveSubMenu: any;
  @Output() changeNavTabEvent = new EventEmitter();
  @Output() activeInactiveMenuEvent = new EventEmitter();
  public themeClass: string = 'theme-cyan';
  public darkClass: string = '';
  public username: string = '';
  public displayImage: string = '';
  private ngUnsubscribe = new Subject();

  constructor(private themeService: ThemeService, private authSrv: AuthService) {
    this.themeService.themeClassChange.pipe(takeUntil(this.ngUnsubscribe)).subscribe((themeClass: string) => {
      this.themeClass = themeClass;
    });
    this.themeService.darkClassChange.pipe(takeUntil(this.ngUnsubscribe)).subscribe((darkClass: string) => {
      this.darkClass = darkClass;
    });
    this.username = this.authSrv.getSysUserData().displayname;
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  changeNavTab(tab: string) {
    this.navTab = tab;
  }

  activeInactiveMenu(menuItem: string) {
    this.activeInactiveMenuEvent.emit({ item: menuItem });
  }

  changeTheme(theme: string) {
    this.themeService.themeChange(theme);
  }

  changeDarkMode(darkClass: string) {
    this.themeService.changeDarkMode(darkClass);
  }
}
