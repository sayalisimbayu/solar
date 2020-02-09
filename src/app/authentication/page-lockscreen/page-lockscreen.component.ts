import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@app/shell/auth/auth.service';

@Component({
  selector: 'app-page-lockscreen',
  templateUrl: './page-lockscreen.component.html',
  styleUrls: ['./page-lockscreen.component.css']
})
export class PageLockscreenComponent implements OnInit {
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
  ngOnInit() { }

  onSubmit() {
    if (this.password != undefined && this.password != '') {
      this.authSvc.login({ email: this.loggedUserEmail, password: this.password }).subscribe((res) => {
        if (this.authSvc.isLoggedIn()) {
          this.router.navigate(['/admin/dashboard/index']);
        }
      });
    }
    return false;
  }
}
