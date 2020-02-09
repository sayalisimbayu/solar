import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'app-appliance-status-widget',
    templateUrl: './appliance-status-widget.component.html',
    styleUrls: ['./appliance-status-widget.component.css']
})
export class ApplianceStatusWidgetComponent implements OnInit {

    @Input() options:any = {};

    constructor() { }

    ngOnInit() {
    }

}
