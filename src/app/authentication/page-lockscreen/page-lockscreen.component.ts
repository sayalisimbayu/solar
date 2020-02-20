import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '@app/shell/auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-page-lockscreen',
  templateUrl: './page-lockscreen.component.html',
  styleUrls: ['./page-lockscreen.component.css']
})
export class PageLockscreenComponent implements OnInit, OnDestroy {
  returnUrl: string;
  public loggedUser: string;
  public loggedUserEmail: string;
  public password = '';
  private subScription: Subscription;
  constructor(private router: Router, private activatedRoute: ActivatedRoute, private authSvc: AuthService) {
    this.loggedUser = this.authSvc.getSysUserData().displayname;
    this.loggedUserEmail = this.authSvc.getSysUserData().username;
    const rememberedCred = this.authSvc.getRememberedCredentials();
    this.authSvc.cleanStorage();
    if (rememberedCred != null && rememberedCred.password) {
      this.password = rememberedCred.password;
    }
    this.returnUrl = this.activatedRoute.snapshot.queryParams.returnUrl || '/';
    this.subScription=new Subscription();
  }
  ngOnInit() { }
  ngOnDestroy() {
    this.subScription.unsubscribe();
  }

  onSubmit() {
    if (this.password != undefined && this.password != '') {
      this.subScription.add(this.authSvc.login({ email: this.loggedUserEmail, password: this.password }).subscribe(res => {
        if (this.authSvc.isLoggedIn()) {
          this.password = '';
          this.router.navigate([this.returnUrl]);
        }
      }));
    }
    return false;
  }
}
