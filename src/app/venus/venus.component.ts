import { Component, OnDestroy, ViewEncapsulation } from "@angular/core";
import { Router } from '@angular/router';

@Component({
    selector: 'app-venus',
    templateUrl: './venus.component.html',
    styleUrls: ['./venus.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class VenusComponent implements OnDestroy {
    constructor(){}
    ngOnDestroy(){}
}