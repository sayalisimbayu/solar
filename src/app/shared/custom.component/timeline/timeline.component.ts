import { OnInit, Component, AfterViewInit, OnDestroy, Input } from '@angular/core';
import { AutoUnsubscribe } from '@app/shared/decoraters/decorators';
@Component({
    selector: 'timeline',
    templateUrl: './timeline.component.html',
    styleUrls: ['./timeline.component.scss']
})
@AutoUnsubscribe()
export class TimelineComponent implements OnInit, AfterViewInit, OnDestroy {
    @Input() storeId: string;
    public config: any;
    constructor() {}
    
    ngOnInit(): void {
    }

    ngAfterViewInit(): void {

    }

    ngOnDestroy(): void {

    }
}