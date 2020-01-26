import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-page-lockscreen',
  templateUrl: './page-lockscreen.component.html',
  styleUrls: ['./page-lockscreen.component.css']
})
export class PageLockscreenComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit() {}

  onSubmit() {
    this.router.navigate(['/admin/dashboard/index']);
  }
}
