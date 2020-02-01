import { Component, Input, OnInit, OnDestroy, ViewChildren, QueryList, ElementRef, ViewChild, TemplateRef } from '@angular/core';
import { SimpleStoreManagerService } from '@app/shared/storemanager/storemanager.service';
import { ICGridConfig } from './config/config';
import { filter, map } from 'rxjs/operators';
import { StoreEvent } from '@app/shared/storemanager/models/storeEvent.model';
import { AutoUnsubscribe } from '@app/shared/decoraters/decorators';

@Component({
    selector: 'app-c-grid',
    templateUrl: './cgrid.component.html',
})
@AutoUnsubscribe()
export class CGridComponent implements OnInit, OnDestroy {
    @Input() storeId: string;
    @ViewChildren('button',{ read: true }) buttons: QueryList<ElementRef>;
    @ViewChild('deleteTemplate', { read: TemplateRef, static: true }) deleteComponent: TemplateRef<any>;
    @ViewChild('deleteTemplate', { read: TemplateRef, static: true }) checkboxComponent: TemplateRef<any>;
    public config: ICGridConfig;
    public pagebody$: any;

    constructor(private store: SimpleStoreManagerService) {

    }
    ngOnDestroy() { }
    ngOnInit(): void {
        //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
        //Add 'implements OnInit' to the class.
        this.pagebody$ = this.store.$store
            .pipe(filter((se: { key: string }) => se.key === this.storeId))
            .pipe(
                map((el: StoreEvent) => {
                    // if (el.path.length === 0 || (el.path.length === 1 && el.path.indexOf(this.storeId) > -1)) {
                    this.config = el.store.value;
                    // }
                    // this.store.setIn('categorypageconfig', ['pageHeading'], el.store.value.pageTitle);
                    // this.store.setIn('categorypageconfig', ['pageBodyUrl'], el.store.value.pageBodyUrl);
                })
            )
            .subscribe();
    }
    public delete(category: any) {
        alert('deleting');
    }

    public navigate(category: any) {
        alert('navigating');
        this.store.setIn('categorypageconfig', ['pageHeading'], 'Category Form');
        this.store.setIn('categorypageconfig', ['pageBodyUrl'], 'app-category-form');
    }
}