import { Component, AfterViewInit, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { takeUntil, filter, map, mergeMap } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { SidebarService } from '@app/shared/services/sidebar.service';
import { ThemeService } from '@app/shared/services/theme.service';
import { Title } from '@angular/platform-browser';

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

    constructor(
        public sidebarService: SidebarService,
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private themeService: ThemeService,
        private titleService: Title
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
                    while (route.firstChild) { route = route.firstChild; }
                    return route;
                })
            )
            .pipe(filter(route => route.outlet === 'primary'))
            .pipe(mergeMap(route => route.data))
            .pipe(takeUntil(this.ngUnsubscribe))
            .subscribe(event => this.titleService.setTitle(event.title));
    }

    ngOnDestroy() {
        this.ngUnsubscribe.next();
        this.ngUnsubscribe.complete();
    }

    toggleNotificationDropMenu() {
        this.showNotifMenu = !this.showNotifMenu;
    }

    toggleSettingDropMenu() {
        this.showToggleMenu = !this.showToggleMenu;
    }

    ngAfterViewInit() {
        const that = this;
        setTimeout(() => {
            that.isStopLoading = true;
        }, 1000);
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
