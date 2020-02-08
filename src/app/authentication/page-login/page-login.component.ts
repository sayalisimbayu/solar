import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '@app/shell/auth/auth.service';
import { Observable } from 'rxjs';
import { AppPermission } from '@app/shell/models/user.model';
import { NgForm } from '@angular/forms';
import { CryptService } from '@app/shared/services/crypt.service';

@Component({
  selector: 'app-page-login',
  templateUrl: './page-login.component.html',
  styleUrls: ['./page-login.component.css']
})
export class PageLoginComponent implements OnInit {
  returnUrl: string;
  errors: any = [];
  public loginForm: any;
  public userEmail = 'abc';
  public passWrod = '';
  public user: any = { email: '', password: '' };
  showMessages: any = {};
  messages: any = [];
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private authSvc: AuthService
  ) {
    this.returnUrl = this.activatedRoute.snapshot.queryParams.returnUrl || '/';
    if (this.authSvc.isLoggedIn()) {
      this.router.navigate([this.returnUrl]);
    }
    if (localStorage.getItem('rememberme') && localStorage.getItem('rememberme') !== '') {
      debugger;
      const lcRememberme = this.cryptSvc.get('simbayu$#@$^@ERF', localStorage.getItem('rememberme'));
      if (lcRememberme != '') {
        this.user = JSON.parse(lcRememberme);
      }
    }
  }

  ngOnInit() {}

  onSubmit(loginForm: NgForm) {
    this.errors = [];
    if (!this.authSvc.isLoggedIn()) {
      this.authSvc.login(this.user).subscribe(
        items => {
          if (this.authSvc.isLoggedIn()) {
            if (this.user.rememberme != undefined && this.user.rememberme != '' && this.user.rememberme === true) {
              localStorage.setItem('rememberme', this.cryptSvc.set('simbayu$#@$^@ERF', JSON.stringify(this.user)));
            }
            this.getPermissions(this.user.email).subscribe(permissions => {
              this.router.navigate([this.returnUrl]);
            });
          }
        },
        error => {
          if (error.status === 401) {
            this.errors.push('Invalid Credentials.');
            this.showMessages = { error: this.errors, message: this.messages };
          } else {
            this.errors.push(error.message);
            this.showMessages = { error: this.errors, message: this.messages };
          }
        }
      );
    }
  }
  getPermissions(username: string): Observable<AppPermission[]> {
    return this.authSvc.fetchpermission(username);
  }
}
