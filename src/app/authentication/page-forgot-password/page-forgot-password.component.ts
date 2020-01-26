import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-page-forgot-password',
  templateUrl: './page-forgot-password.component.html',
  styleUrls: ['./page-forgot-password.component.css']
})
export class PageForgotPasswordComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit() {}

  onSubmit() {
    this.router.navigate(['/authentication/page-login']);
  }
}
