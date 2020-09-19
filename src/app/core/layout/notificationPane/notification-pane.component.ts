import { Component, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { ThemeService } from '@app/shared/services/theme.service';
import { AuthService } from '@app/shell/auth/auth.service';
import { AppTheme } from '@app/shell/models/appsetting.model';
import { UserRepoService } from '@app/shared/reposervice/user.repo.service';

@Component({
  selector: 'app-notification-pane',
  templateUrl: './notification-pane.component.html',
  styleUrls: ['./notification-pane.component.scss']
})
export class NotificationPaneComponent implements OnDestroy {
  @Input() sidebarVisible: boolean = false;
  public themeClass: string = 'theme-cyan';
  private ngUnsubscribe = new Subject();
  constructor(
    private themeService: ThemeService,
    private authSrv: AuthService,
    private userRepoService: UserRepoService
  ) {
    this.themeService.themeClassChange.pipe(takeUntil(this.ngUnsubscribe)).subscribe((themeClass: string) => {
      this.themeClass = themeClass;
    });
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
