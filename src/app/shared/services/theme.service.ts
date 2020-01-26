import { Injectable } from '@angular/core';
import { of, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  public themeClass: string = 'theme-cyan';
  public darkClass: string = '';
  public smallScreenMenu = '';

  themeClassChange: Subject<string> = new Subject<string>();
  smallScreenMenuShow: Subject<string> = new Subject<string>();
  darkClassChange: Subject<string> = new Subject<string>();

  constructor() {
    this.themeClassChange.subscribe(value => {
      this.themeClass = value;
    });
    this.smallScreenMenuShow.subscribe(value => {
      this.smallScreenMenu = value;
    });
    this.darkClassChange.subscribe(value => {
      this.darkClass = value;
    });
  }

  themeChange(theme: string) {
    this.themeClassChange.next(theme);
  }

  showHideMenu() {
    if (!this.smallScreenMenu) {
      this.smallScreenMenuShow.next('offcanvas-active');
    } else {
      this.smallScreenMenuShow.next('');
    }
  }

  hideMenu() {
    this.smallScreenMenuShow.next('');
  }

  changeDarkMode(darkClass: string) {
    this.darkClassChange.next(darkClass);
  }
}
