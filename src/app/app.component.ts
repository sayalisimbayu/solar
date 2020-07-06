import { Component, HostListener, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from './shell/auth/auth.service';
import { SignalRService } from './shared/services/signalr.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  constructor(public signalRService: SignalRService) {
    this.signalRService.startConnection();
    this.signalRService.SubscribeSendNotification();
  }

  ngOnInit() {}
  ngOnDestroy() {
    this.signalRService.stopConnection();
  }
}
