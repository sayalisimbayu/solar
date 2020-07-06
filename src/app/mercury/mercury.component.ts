import { Component, AfterViewInit, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { takeUntil, filter, map, mergeMap } from 'rxjs/operators';
import { Subject, Subscription } from 'rxjs';
import { SidebarService } from '@app/shared/services/sidebar.service';
import { ThemeService } from '@app/shared/services/theme.service';
import { Title } from '@angular/platform-browser';
import { AuthService } from '@app/shell/auth/auth.service';
import { AutoUnsubscribe } from '@app/shared/decoraters/decorators';
import { UserIdleService } from 'angular-user-idle';

@Component({
  selector: 'app-mercury',
  templateUrl: './mercury.component.html'
})
export class MercuryComponent implements AfterViewInit, OnInit, OnDestroy {
  public title = 'Mercury';
  public isStopLoading = false;
  public showNotifMenu = false;
  public showToggleMenu = false;
  public navTab = 'menu';
  public currentActiveMenu = 'light';
  public currentActiveSubMenu: string;
  public themeClass = 'theme-cyan';
  public smallScreenMenu = '';
  public darkClass = '';
  private ngUnsubscribe = new Subject();
  private subScription = new Subscription();

  constructor(
    public sidebarService: SidebarService,
    private router: Router,
    private authSrv: AuthService,
    private activatedRoute: ActivatedRoute,
    private themeService: ThemeService,
    private titleService: Title,
    private userIdle: UserIdleService
  ) {
    this.activatedRoute.url.pipe(takeUntil(this.ngUnsubscribe)).subscribe(url => {
      this.isStopLoading = false;
      this.getActiveRoutes();
    });

    this.themeService.themeClassChange.pipe(takeUntil(this.ngUnsubscribe)).subscribe((themeClass: any) => {
      this.themeClass = themeClass;
    });

    this.themeService.smallScreenMenuShow.pipe(takeUntil(this.ngUnsubscribe)).subscribe((showMenuClass: any) => {
      this.smallScreenMenu = showMenuClass;
    });

    this.themeService.darkClassChange.pipe(takeUntil(this.ngUnsubscribe)).subscribe((darkClass: any) => {
      this.darkClass = darkClass;
    });
  }

  ngOnInit() {
    const that = this;
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .pipe(map(() => this.activatedRoute))
      .pipe(
        map(route => {
          that.themeService.hideMenu();
          while (route.firstChild) {
            route = route.firstChild;
          }
          return route;
        })
      )
      .pipe(filter(route => route.outlet === 'primary'))
      .pipe(mergeMap(route => route.data))
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(event => this.titleService.setTitle(event.title));
    //Start watching for user inactivity.
    this.userIdle.startWatching();
    // Start watching when user idle is starting.
    this.subScription.add(this.userIdle.onTimerStart().subscribe(count => console.log(count)));
    // Start watch when time is up.
    this.subScription.add(
      this.userIdle.onTimeout().subscribe(() => {
        this.authSrv.lockScreen();
        this.userIdle.stopWatching();
      })
    );
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
    this.subScription.unsubscribe();
  }

  toggleNotificationDropMenu() {
    this.showNotifMenu = !this.showNotifMenu;
  }

  toggleSettingDropMenu() {
    this.showToggleMenu = !this.showToggleMenu;
  }

  ngAfterViewInit() {
    const that = this;
    // that.isStopLoading = true;
    setTimeout(() => {
      that.isStopLoading = true;
    }, 2000);
  }

  getActiveRoutes() {
    const segments: Array<string> = this.router.url.split('/');
    this.currentActiveMenu = segments[2];
    this.currentActiveSubMenu = segments[3];
  }

  activeInactiveMenu($event: { item: string }) {
    if ($event.item && $event.item === this.currentActiveMenu) {
      this.currentActiveMenu = '';
    } else {
      this.currentActiveMenu = $event.item;
    }
  }
}
