import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgbDropdownConfig } from '@ng-bootstrap/ng-bootstrap';
import { ThemeService } from '@app/shared/services/theme.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  providers: [NgbDropdownConfig]
})
export class HeaderComponent implements OnInit {
  // Properties

  @Input() showNotifMenu: boolean = false;
  @Input() showToggleMenu: boolean = false;
  @Input() darkClass: string = '';
  @Output() toggleSettingDropMenuEvent = new EventEmitter();
  @Output() toggleNotificationDropMenuEvent = new EventEmitter();

  constructor(private config: NgbDropdownConfig, private themeService: ThemeService) {
    config.placement = 'bottom-right';
  }

  ngOnInit() {}

  toggleSettingDropMenu() {
    this.toggleSettingDropMenuEvent.emit();
  }

  toggleNotificationDropMenu() {
    this.toggleNotificationDropMenuEvent.emit();
  }

  toggleSideMenu() {
    this.themeService.showHideMenu();
  }
}
