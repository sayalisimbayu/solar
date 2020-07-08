import { Component, OnInit, Input } from "@angular/core";
import { AppPermission } from '@app/shell/models/user.model';

@Component({
    selector: 'app-right-panel',
    templateUrl: './right-panel.component.html',
    styleUrls: ['./right-panel.component.scss']
})

export class RightPanelComponent implements OnInit {
    @Input('permissions') permissions : AppPermission[];
    constructor() {}
    ngOnInit(): void {

        console.log('permission', this.permissions);
    }
}