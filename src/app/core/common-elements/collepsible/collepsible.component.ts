import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-collepsible',
  templateUrl: './collepsible.component.html',
  styleUrls: ['./collepsible.component.css']
})
export class CollepsibleComponent implements OnInit {

  @Input() options:any = {};
  @Input() visible:number;

  constructor() { }

  ngOnInit() {
  }

  showItem(index:number){
    if(index == (this.visible - 1)){
      this.visible = undefined;
    } else {
      this.visible = (index+1);
    }
  }

}
