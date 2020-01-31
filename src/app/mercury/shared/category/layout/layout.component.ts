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
    public visitorsOptions: EChartOption = {};
    public visitsOptions: EChartOption = {};
    public sidebarVisible = true;
    private PageFrameConfig: IPageFrameConfig;
    constructor(
        private lazyLoader: LazyLoaderService,
        private store: SimpleStoreManagerService
    ) {
    }

    ngOnInit() { }
    ngAfterViewInit(): void {
        const that = this;
        // Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
        // Add 'implements AfterViewInit' to the class.
        this.PageFrameConfig = {
            pageBodyUrl: 'page-header-chart',
            pageHeading: 'Blank Page',
            pageTitle: {
                breadCrumb: [{
                    title: 'Blank Page',
                    url: '',
                    clickable: false
                }, {
                    title: 'Blank Page',
                    url: '',
                    clickable: false
                }],
                leftComponentUrl: 'page-header-chart',
                pageTitle: 'Blank Page'
            }
        };
        this.pageFrame.clear();
        this.lazyLoader.load('page-frame', this.pageFrame, 'blankpageconfig', (cmpRef: any) => {
            this.store.add('blankpageconfig', this.PageFrameConfig);
            cmpRef.changeDetectorRef.detectChanges();
        });
        setTimeout(() => {
            that.PageFrameConfig.pageTitle.pageTitle = 'Updated';
            that.store.setIn('blankpageconfig', ['pageTitle', 'pageTitle'], 'Updated');
        }, 3000);
    }

}
