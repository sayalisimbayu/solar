import { Component, ViewChild, ViewContainerRef, AfterViewInit } from '@angular/core';
import { SimpleStoreManagerService } from '@app/shared/storemanager/storemanager.service';
import { LazyLoaderService } from '@app/shared/services/lazy-loader.service';
import { ICGridConfig } from '@app/shared/custom.component/cgrid/config/config';

@Component({
    selector: 'app-page-category-grid',
    templateUrl: './grid.component.html',
})
export class CategoryGridComponent implements AfterViewInit {
    @ViewChild('pageGrid', { read: ViewContainerRef, static: true })
    pageGrid: ViewContainerRef;
    private pageGridConfig: ICGridConfig;
    constructor(private store: SimpleStoreManagerService,
        private lazyLoader: LazyLoaderService) {
        this.pageGridConfig = {
            items: ["test"],
            isCheckbox: true,
            functions: {
                onDelete: this.onDelete,
                onSelect: this.onSelect
            }
        }
    }
    onDelete(event: any) {
        alert('deleting');
    }
    onSelect(event: any) {
        alert('navigating');
    }
    ngAfterViewInit(): void {

        this.pageGrid.clear();
        this.lazyLoader.load('app-c-grid', this.pageGrid, 'categorypagegridconfig', (cmpRef: any) => {
            if (this.store.has('categorypagegridconfig')) {
                this.store.setIn('categorypagegridconfig', [], this.pageGridConfig);
            }
            else {
                this.store.add('categorypagegridconfig', this.pageGridConfig);
            }
        });
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