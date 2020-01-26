import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { takeUntil, mergeMap, map, filter } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.css']
})
export class AuthenticationComponent implements OnInit, OnDestroy {
  private ngUnsubscribe = new Subject();

  constructor(private router: Router, private activatedRoute: ActivatedRoute, private titleService: Title) {}

  ngOnInit() {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .pipe(map(() => this.activatedRoute))
      .pipe(
        map((route: ActivatedRoute) => {
          while (route.firstChild) {
            route = route.firstChild;
          }
          return route;
        })
      )
      .pipe(
        filter((route: ActivatedRoute) => {
          return route.outlet === 'primary';
        })
      )
      .pipe(mergeMap((route: ActivatedRoute) => route.data))
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((event: { [x: string]: string }) => this.titleService.setTitle(event['title']));
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
