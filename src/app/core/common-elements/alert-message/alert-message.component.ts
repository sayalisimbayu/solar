import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-alert-message',
  templateUrl: './alert-message.component.html',
  styleUrls: ['./alert-message.component.css']
})
export class AlertMessageComponent implements OnInit {

  @Input() options:any = {};

  public showElement:boolean = true;
  
  constructor() { }

  ngOnInit() {
  }

  toggleElement(){
    this.showElement = !this.showElement;
  }

}
