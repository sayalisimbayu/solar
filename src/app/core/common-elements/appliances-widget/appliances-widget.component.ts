import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'app-appliances-widget',
    templateUrl: './appliances-widget.component.html',
    styleUrls: ['./appliances-widget.component.css']
})
export class AppliancesWidgetComponent implements OnInit {

    @Input() options:any = {};
    @Output() toggleEvent = new EventEmitter();
    @Output() allOnEvent = new EventEmitter();
    @Output() allOffEvent = new EventEmitter();

    constructor() { }

    ngOnInit() {
    }

    toggleLight(index: number){
        this.toggleEvent.emit({ 'index': index});
    }

    allOn(){
        this.allOnEvent.emit();
    }

    allOff() {
        this.allOffEvent.emit();
    }
}
