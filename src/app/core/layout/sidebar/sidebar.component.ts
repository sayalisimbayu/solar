import { Component, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { ThemeService } from '@app/shared/services/theme.service';
import { AuthService } from '@app/shell/auth/auth.service';
import { AppTheme } from '@app/shell/models/appsetting.model';
import { UserRepoService } from '@app/shared/reposervice/user.repo.service';

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
  public profileImage: string = 'assets/images/user.png';
  public displayImage: string = '';
  private ngUnsubscribe = new Subject();
  private appTheme: AppTheme;
  constructor(private themeService: ThemeService, private authSrv: AuthService, private userRepoService: UserRepoService) {
    this.themeService.themeClassChange.pipe(takeUntil(this.ngUnsubscribe)).subscribe((themeClass: string) => {
      this.themeClass = themeClass;
    });
    this.themeService.darkClassChange.pipe(takeUntil(this.ngUnsubscribe)).subscribe((darkClass: string) => {
      this.darkClass = darkClass;
    });
    const userData = this.authSrv.getSysUserData();
    if (userData.addonconfig && userData.addonconfig) {
      this.themeClass = userData.addonconfig.theme != '' ? userData.addonconfig.theme : this.themeClass;
      this.darkClass = userData.addonconfig.skin != '' ? userData.addonconfig.skin : this.darkClass;
    }
    else {
      this.appTheme = {
        usid: userData.id,
        skin: this.darkClass,
        theme: this.themeClass
      };
      this.userRepoService.setThemeForUser(this.appTheme).subscribe();
    }
    this.username = userData.displayname;
    if (userData.profileimg != undefined && userData.profileimg != '') {
      this.profileImage = userData.profileimg;
    }
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
    this.appTheme.skin = theme;
    this.userRepoService.setThemeForUser(this.appTheme).subscribe();
  }

  changeDarkMode(darkClass: string) {
    this.themeService.changeDarkMode(darkClass);
    this.appTheme.theme = darkClass;
    this.userRepoService.setThemeForUser(this.appTheme).subscribe();
  }
}
