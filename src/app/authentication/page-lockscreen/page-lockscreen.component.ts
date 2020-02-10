import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@app/shell/auth/auth.service';
import { AutoUnsubscribe } from '@app/shared/decoraters/decorators';

@Component({
  selector: 'app-page-lockscreen',
  templateUrl: './page-lockscreen.component.html',
  styleUrls: ['./page-lockscreen.component.css']
})
@AutoUnsubscribe()
export class PageLockscreenComponent implements OnInit, OnDestroy {
  public loggedUser: string;
  public loggedUserEmail: string;
  public password = '';
  constructor(private router: Router, private authSvc: AuthService) {
    this.loggedUser = this.authSvc.getSysUserData().displayname;
    this.loggedUserEmail = this.authSvc.getSysUserData().username;
    const rememberedCred = this.authSvc.getRememberedCredentials();
    this.authSvc.cleanStorage();
    if (rememberedCred != null && rememberedCred.password) {
      this.password = rememberedCred.password;
    }
  }
  ngOnInit() {}
  ngOnDestroy() {}

  onSubmit() {
    if (this.password != undefined && this.password != '') {
      this.authSvc.login({ email: this.loggedUserEmail, password: this.password }).subscribe(res => {
        if (this.authSvc.isLoggedIn()) {
          this.router.navigate(['/admin/dashboard/index']);
        }
      });
    }
    return false;
  }
}
