import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-accordion',
  templateUrl: './accordion.component.html',
  styleUrls: ['./accordion.component.css']
})
export class AccordionComponent implements OnInit {

  @Input() options:any;
  public target:string;

  constructor() { }

  ngOnInit() {
  }

  toggleTarget(target:string){
    if(this.target && target == this.target){
      this.target = undefined;
    } else {
      this.target = target;
    }
  }
}
