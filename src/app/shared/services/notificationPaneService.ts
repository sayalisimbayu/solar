import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NotificationPaneService {
  public sidebarVisible: boolean = false;
  public notificationBadge: number = 0;
  public notificationBadgeBlink: string = '';
  constructor() {}

  toggle() {
    this.sidebarVisible = !this.sidebarVisible;
  }

  getStatus() {
    return this.sidebarVisible;
  }
}
