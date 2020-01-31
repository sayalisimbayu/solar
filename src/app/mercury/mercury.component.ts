import { Component, AfterViewInit, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
    selector: 'app-mercury',
    templateUrl: './mercury.component.html'
})
export class MercuryComponent implements AfterViewInit, OnInit, OnDestroy {
    public isStopLoading = false;
    public currentActiveMenu = 'light';
    public currentActiveSubMenu: string;
    private ngUnsubscribe = new Subject();

    constructor(
        private router: Router,
        private activatedRoute: ActivatedRoute,
    ) {
        this.activatedRoute.url.pipe(takeUntil(this.ngUnsubscribe)).subscribe(url => {
            this.isStopLoading = false;
            this.getActiveRoutes();
        });
    }

    ngOnInit() {
    }

    ngOnDestroy() {
        this.ngUnsubscribe.next();
        this.ngUnsubscribe.complete();
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
}
