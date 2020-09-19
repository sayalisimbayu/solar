import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NotificationPaneService {
  public sidebarVisible: boolean = false;

  constructor() {}

  toggle() {
    this.sidebarVisible = !this.sidebarVisible;
  }

  getStatus() {
    return this.sidebarVisible;
  }
}
