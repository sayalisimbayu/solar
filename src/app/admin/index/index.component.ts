import {
  Component,
  OnInit,
  ChangeDetectorRef,
  OnDestroy,
  ViewChild,
  ViewContainerRef,
  AfterViewInit
} from '@angular/core';
import { EChartOption } from 'echarts';
import { ToastrService } from 'ngx-toastr';
import { SidebarService } from '@app/shared/services/sidebar.service';
import { AutoUnsubscribe } from '@app/shared/decoraters/decorators';
import { SimpleStoreManagerService } from '@app/shared/storemanager/storemanager.service';
import { LazyLoaderService } from '@app/shared/services/lazy-loader.service';
import { filter, map } from 'rxjs/operators';
import { StoreEvent } from '@app/shared/storemanager/models/storeEvent.model';
import { IPageTitleConfig } from '@app/core/layout/page-title/model/page-title.config.interface';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
@AutoUnsubscribe()
export class IndexComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('pagetitle', { read: ViewContainerRef, static: true })
  pageTitle: ViewContainerRef;
  @ViewChild('appDetailTile', { read: ViewContainerRef, static: true })
  appDetailTile: ViewContainerRef;
  @ViewChild('appChartTile', { read: ViewContainerRef, static: true })
  appChartTile: ViewContainerRef;
  public totalEarningSubscriber$: any;
  public sidebarVisible = true;
  public isResizing = false;
  public visitorsOptions: EChartOption = {};
  public visitsOptions: EChartOption = {};
  public earningOptions: EChartOption = {};
  public salesOptions: EChartOption = {};
  public visitsAreaOptions: EChartOption = {};
  public LikesOptions: EChartOption = {};
  public stackedBarChart: EChartOption = {};
  public spendAnalysis: EChartOption = {};
  public dataManagedBarChart: EChartOption = {};

  public earningOptionsSeries: Array<number> = [1, 4, 1, 3, 7, 1];
  public earnings: string = '$' + (this.earningOptionsSeries.reduce((a, b) => a + b, 0) * 1000).toLocaleString();
  public salesOptionsSeries: Array<number> = [1, 4, 2, 3, 6, 2];
  public sales: string = '$' + (this.salesOptionsSeries.reduce((a, b) => a + b, 0) * 10000).toLocaleString();
  public visitsAreaOptionsSeries: Array<number> = [1, 4, 2, 3, 1, 5];
  public visits: number = this.visitsAreaOptionsSeries.reduce((a, b) => a + b, 0);
  public LikesOptionsSeries: Array<number> = [1, 3, 5, 1, 4, 2];
  public likes: number = this.LikesOptionsSeries.reduce((a, b) => a + b, 0);

  public interval: any = {};

  private pageTitleConfig: IPageTitleConfig;

  constructor(
    private sidebarService: SidebarService,
    private cdr: ChangeDetectorRef,
    private toastr: ToastrService,
    private store: SimpleStoreManagerService,
    private lazyLoader: LazyLoaderService
  ) {
    this.visitorsOptions = this.loadLineChartOptions([3, 5, 1, 6, 5, 4, 8, 3], '#49c5b6');
    this.visitsOptions = this.loadLineChartOptions([4, 6, 3, 2, 5, 6, 5, 4], '#f4516c');
    this.earningOptions = this.loadLineAreaChartOptions([1, 4, 1, 3, 7, 1], '#f79647', '#fac091');
    this.salesOptions = this.loadLineAreaChartOptions([1, 4, 2, 3, 6, 2], '#604a7b', '#a092b0');
    this.visitsAreaOptions = this.loadLineAreaChartOptions([1, 4, 2, 3, 1, 5], '#4aacc5', '#92cddc');
    this.LikesOptions = this.loadLineAreaChartOptions([1, 3, 5, 1, 4, 2], '#4f81bc', '#95b3d7');
    this.dataManagedBarChart = this.getDataManagedChartOptions();
    this.stackedBarChart = this.getTopProductChartOptions();
    this.spendAnalysis=this.getSpendAnalysis();
    this.pageTitleConfig = {
      breadCrumb: [
        {
          title: 'Dashboard',
          url: '',
          clickable: false
        }
      ],
      leftComponentUrl: 'page-header-chart',
      pageTitle: 'Dashboard'
    };
  }

  ngOnInit() {
    const that = this;
    setTimeout(function () {
      that.showToastr();
    }, 1000);
  }

  ngOnDestroy() {
    if (this.interval) {
      clearInterval(this.interval);
    }
  }
  ngAfterViewInit(): void {
    // Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    // Add 'implements AfterViewInit' to the class.
    this.updatePagetTitle();
    this.updateAppDetailTile();
    this.updateAppChartTile();

  }
  showToastr() {
    this.toastr.info('Hello, welcome to Simbayu.', undefined, {
      closeButton: true,
      positionClass: 'toast-top-right'
    });
  }

  toggleFullWidth() {
    this.isResizing = true;
    this.sidebarService.toggle();
    this.sidebarVisible = this.sidebarService.getStatus();
    const that = this;
    setTimeout(function () {
      that.isResizing = false;
      that.cdr.detectChanges();
    }, 400);
  }

  loadLineChartOptions(data: any[], color: string) {
    let chartOption: EChartOption;
    const xAxisData: Array<any> = new Array<any>();

    data.forEach(() => {
      xAxisData.push('');
    });

    return (chartOption = {
      xAxis: {
        type: 'category',
        show: false,
        data: xAxisData,
        boundaryGap: false
      },
      yAxis: {
        type: 'value',
        show: false
      },
      tooltip: {
        trigger: 'axis',
        formatter(params) {
          return (
            '<span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:' +
            color +
            ';"></span>' +
            params[0].value
          );
        }
      },
      grid: {
        left: '0%',
        right: '0%',
        bottom: '0%',
        top: '0%',
        containLabel: false
      },
      series: [
        {
          data,
          type: 'line',
          showSymbol: false,
          symbolSize: 1,
          lineStyle: {
            color,
            width: 1
          }
        }
      ]
    });
  }

  loadLineAreaChartOptions(data: any[], color: string, areaColor: string) {
    let chartOption: EChartOption;
    const xAxisData: Array<any> = new Array<any>();

    data.forEach(() => {
      xAxisData.push('');
    });

    return (chartOption = {
      xAxis: {
        type: 'category',
        show: false,
        data: xAxisData,
        boundaryGap: false
      },
      yAxis: {
        type: 'value',
        show: false,
        min: 1
      },
      tooltip: {
        trigger: 'axis',
        formatter(params) {
          return (
            '<span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:' +
            color +
            ';"></span>' +
            params[0].value
          );
        }
      },
      grid: {
        left: '0%',
        right: '0%',
        bottom: '0%',
        top: '0%',
        containLabel: false
      },
      series: [
        {
          data,
          type: 'line',
          showSymbol: false,
          symbolSize: 1,
          lineStyle: {
            color,
            width: 1
          },
          areaStyle: {
            color: areaColor
          }
        }
      ]
    });
  }

  getDataManagedChartOptions() {
    const options: EChartOption = {
      tooltip: {
        trigger: 'item'
      },
      grid: {
        borderWidth: 0
      },
      xAxis: [
        {
          type: 'category',
          show: false
        }
      ],
      yAxis: [
        {
          type: 'value',
          show: false
        }
      ],
      series: [
        {
          type: 'bar',
          stack: 'Gedgets',
          data: [2, 0, 5, 0, 4, 0, 8, 0, 3, 0, 9, 0, 1, 0, 5],
          itemStyle: {
            color: '#7460ee'
          }
        },
        {
          type: 'bar',
          stack: 'Gedgets',
          data: [0, -5, 0, -1, 0, -9, 0, -3, 0, -8, 0, -4, 0, -5, 0],
          itemStyle: {
            color: '#afc979'
          }
        }
      ]
    };

    return options;
  }

  private updatePagetTitle() {
    const that = this;
    if (this.pageTitle !== undefined) {
      this.pageTitle.clear();
    }
    this.lazyLoader.load('page-title', this.pageTitle, 'dashboard_page_title', (_cdRef: any) => {
      if (!that.store.has('dashboard_page_title')) {
        that.store.add('dashboard_page_title', this.pageTitleConfig, true);
      } else {
        that.store.setIn('dashboard_page_title', [], this.pageTitleConfig);
      }
    });
  }

  private updateAppDetailTile() {
    const that = this;
    if (this.appDetailTile !== undefined) {
      this.appDetailTile.clear();
    }
    this.lazyLoader.load('app-detail-titles', this.appDetailTile, 'dashboard_app_detail_title', (_cdRef: any) => {
      this.interval = setInterval(() => {
        that.earningOptionsSeries.shift();
        let rand = Math.floor(Math.random() * 11);
        if (!rand) {
          rand = 1;
        }
        that.earningOptionsSeries.push(rand);
        that.earningOptions = that.loadLineAreaChartOptions(that.earningOptionsSeries, '#f79647', '#fac091');
        
        that.earnings = '$' + (that.earningOptionsSeries.reduce((a, b) => a + b, 0) * 1000).toLocaleString();
        if (that.store.has('totalEarnings')) {
          that.store.set('totalEarnings', that.earnings);
        } else {
          that.store.add('totalEarnings', that.earnings);
        }
        if (!that.store.has('dashboard_app_detail_title')) {
          that.store.add('dashboard_app_detail_title', {
            title: "EARNINGS",
            value: that.earnings,
            details: "19% compared to last week",
            chartoptions: that.earningOptions
          }, true);
        } else {
          that.store.setIn('dashboard_app_detail_title', [], {
            title: "EARNINGS",
            value: that.earnings,
            details: "19% compared to last week",
            chartoptions: that.earningOptions
          });
        }
        that.salesOptionsSeries.shift();
        rand = Math.floor(Math.random() * 11);
        if (!rand) {
          rand = 1;
        }
        that.salesOptionsSeries.push(rand);
        that.salesOptions = that.loadLineAreaChartOptions(that.salesOptionsSeries, '#604a7b', '#a092b0');
        that.sales = '$' + (that.salesOptionsSeries.reduce((a, b) => a + b, 0) * 10000).toLocaleString();
  
        that.visitsAreaOptionsSeries.shift();
        rand = Math.floor(Math.random() * 11);
        if (!rand) {
          rand = 1;
        }
        that.visitsAreaOptionsSeries.push(rand);
        that.visits += rand;
        that.visitsAreaOptions = that.loadLineAreaChartOptions(that.visitsAreaOptionsSeries, '#4aacc5', '#92cddc');
  
        that.LikesOptionsSeries.shift();
        rand = Math.floor(Math.random() * 11);
        if (!rand) {
          rand = 1;
        }
        that.LikesOptionsSeries.push(rand);
        that.likes += rand;
        that.LikesOptions = that.loadLineAreaChartOptions(that.LikesOptionsSeries, '#4f81bc', '#95b3d7');
        that.cdr.markForCheck();
      }, 3000);
      that.cdr.detectChanges();
    });
  }

  private updateAppChartTile(){
    const that = this;
    if (this.appChartTile !== undefined) {
      this.appChartTile.clear();
    }
    this.lazyLoader.load('app-chart-tiles', this.appChartTile, 'dashboard_chart_tiles', (_cdRef: any) => {
      if (!that.store.has('dashboard_chart_tiles')) {
        that.store.add('dashboard_chart_tiles', {
          title:'Spend Analysis',
          chartoptions: that.getSpendAnalysis()
        }, true);
      } else {
        that.store.setIn('dashboard_chart_tiles', [], {
          title:'Spend Analysis',
          chartoptions: that.getSpendAnalysis()
        });
      }
    });
  }

  private getTopProductChartOptions() {
    let options: any = {
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow'
        }
      },
      legend: {
        data: ['Mobile', 'Laptop', 'Computer'],
        right: '4%',
        textStyle: {
          color: "#C2C2C2",
        }
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: [
        {
          type: 'category',
          data: ['Q1', 'Q2', 'Q3', 'Q4', 'Q5'],
          axisLine: {
            show: false
          },
          axisLabel: {
            textStyle: {
              color: "#C2C2C2",
            },
          }
        }
      ],
      yAxis: [
        {
          type: 'value',
          minInterval: 2500,
          splitLine: {
            lineStyle: {
              type: 'dotted'
            }
          },
          axisLine: {
            show: false
          },
          axisLabel: {
            formatter: function (value: any, index: any) {
              if (value > 0) {
                return (value / 1000) + ' K';
              } else {
                return 0;
              }
            },
            textStyle: {
              color: "#C2C2C2",
            }
          }
        }
      ],
      series: [
        {
          name: 'Mobile',
          type: 'bar',
          stack: 'Gedgets',
          data: [2350, 3205, 4520, 2351, 5632],
          itemStyle: {
            color: "#6ebdd1"
          },
          barWidth: "40px"
        },
        {
          name: 'Laptop',
          type: 'bar',
          stack: 'Gedgets',
          data: [2341, 2583, 1592, 2674, 2323],
          itemStyle: {
            color: "#f9ab6c"
          },
          barWidth: "40px"
        },
        {
          name: 'Computer',
          type: 'bar',
          stack: 'Gedgets',
          data: [1212, 5214, 2325, 4235, 2519],
          itemStyle: {
            color: "#afc979"
          },
          barWidth: "40px"
        }
      ]
    };

    return options;
  }

  private getSpendAnalysis() {
    var labelOption = {
      show: true,
      position: 'insideBottom',
      distance: 15,
      align: 'left',
      verticalAlign: 'middle',
      rotate: '90',
      formatter: '{c}  {name|{a}}',
      fontSize: 16,
      rich: {
        name: {
          textBorderColor: '#fff'
        }
      }
    };
    let options: any = {
      color: ['#821752', '#de4463'],
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow'
        }
      },
      legend: {
        data: ['Forest', 'Steppe', 'Desert', 'Wetland']
      },
      toolbox: {
        show: false,
        orient: 'vertical',
        left: 'right',
        top: 'center',
        feature: {
          mark: { show: true },
          dataView: { show: true, readOnly: false },
          magicType: { show: true, type: ['line', 'bar', 'stack', 'tiled'] },
          restore: { show: true },
          saveAsImage: { show: true }
        }
      },
      xAxis: [
        {
          type: 'category',
          axisTick: { show: false },
          data: ['2012', '2013', '2014', '2015', '2016']
        }
      ],
      yAxis: [
        {
          type: 'value'
        }
      ],
      series: [
        {
          name: 'Forest',
          type: 'bar',
          barGap: 0,
          label: labelOption,
          data: [320, 332, 301, 334, 390]
        },
        {
          name: 'Steppe',
          type: 'bar',
          label: labelOption,
          data: [220, 182, 191, 234, 290]
        }
      ]
    };
    return options;
  }
}
