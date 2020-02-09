import { Component, HostListener, OnInit } from '@angular/core';
import { AuthService } from './shell/auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor() { }

  ngOnInit() { }

}
