import {
    Component,
    OnInit,
    ViewChild,
    ViewContainerRef,
    AfterViewInit,
} from '@angular/core';
import { EChartOption } from 'echarts';
import { IPageFrameConfig } from '@app/core/layout/page-frame/model/page-frame.config.interface';
import { LazyLoaderService } from '@app/shared/services/lazy-loader.service';
import { SimpleStoreManagerService } from '@app/shared/storemanager/storemanager.service';

@Component({
    selector: 'app-cat-layout',
    templateUrl: './layout.component.html',
    styleUrls: ['./layout.component.scss']
})
export class CLayoutComponent implements OnInit, AfterViewInit {
    @ViewChild('pageframe', { read: ViewContainerRef, static: true })
    pageFrame: ViewContainerRef;
    public pagebody$: any;
    public visitorsOptions: EChartOption = {};
    public visitsOptions: EChartOption = {};
    public sidebarVisible = true;
    private PageFrameConfig: IPageFrameConfig;
    constructor(
        private lazyLoader: LazyLoaderService,
        private store: SimpleStoreManagerService
    ) {
        // this.pagebody$ = this.store.$store
        // .pipe(filter((se: { key: string }) => se.key === 'category-form-path'))
        // .pipe(
        //   map((el: StoreEvent) => {
        //     // this.store.setIn('categorypageconfig', ['pageHeading'], el.store.value.pageTitle);
        //     // this.store.setIn('categorypageconfig', ['pageBodyUrl'], el.store.value.pageBodyUrl);
        //   })
        // )
        // .subscribe();
    }

    ngOnInit() { }
    ngAfterViewInit(): void {
        const that = this;
        // Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
        // Add 'implements AfterViewInit' to the class.
        this.PageFrameConfig = {
            pageBodyUrl: 'app-category-grid',
            pageHeading: 'Category Grid',
            pageTitle: {
                breadCrumb: [{
                    title: 'Dashboard',
                    url: 'admin/dashboard/index',
                    clickable: false
                }, {
                    title: 'Category',
                    url: '',
                    clickable: false
                }],
                leftComponentUrl: 'page-header-chart',
                pageTitle: 'Category'
            }
        };
        this.pageFrame.clear();
        this.lazyLoader.load('page-frame', this.pageFrame, 'categorypageconfig', (cmpRef: any) => {
            this.store.add('categorypageconfig', this.PageFrameConfig);
            cmpRef.changeDetectorRef.detectChanges();
        });
    }

}
