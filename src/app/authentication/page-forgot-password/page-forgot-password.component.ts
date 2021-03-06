import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@app/shell/auth/auth.service';
import { resetUser } from '@app/shell/models/user.model';

@Component({
  selector: 'app-page-forgot-password',
  templateUrl: './page-forgot-password.component.html',
  styleUrls: ['./page-forgot-password.component.css']
})
export class PageForgotPasswordComponent implements OnInit {
  public user: resetUser = {
    email: '',
    otp: '',
    password: '',
    confirmpassword: ''
  };
  public isForgot = true;
  constructor(private router: Router, private authSvc: AuthService) {}

  ngOnInit() {}
  forgot() {
    this.authSvc.forgot(this.user.email).subscribe(res => {
      this.isForgot = !this.isForgot;
    });
  }
  onSubmit() {
    this.authSvc.reset(this.user).subscribe(res => {
      if (res) {
        this.router.navigate(['/authentication/page-login']);
      }
    });
  }
}
