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
  @ViewChild('appDashboardGrid', { read: ViewContainerRef, static: true })
  appDashboardGrid: ViewContainerRef;
  public totalEarningSubscriber$: any;
  public sidebarVisible = true;
  public isResizing = false;
  public earningOptions: EChartOption = {};
  public salesOptions: EChartOption = {};
  public profitOptions: EChartOption = {};
  public yieldOptions: EChartOption = {};
  public spendAnalysis: EChartOption = {};

  public earningOptionsSeries: Array<number> = [1, 4, 1, 3, 7, 1];
  public earnings: string = '$' + (this.earningOptionsSeries.reduce((a, b) => a + b, 0) * 1000).toLocaleString();
  public salesOptionsSeries: Array<number> = [1, 4, 2, 3, 6, 2];
  public sales: string = '$' + (this.salesOptionsSeries.reduce((a, b) => a + b, 0) * 10000).toLocaleString();
  public profitOptionsSeries: Array<number> = [1, 4, 2, 3, 6, 2];
  public profit: string = '$' + (this.profitOptionsSeries.reduce((a, b) => a + b, 0) * 10000).toLocaleString();
  public yieldOptionsSeries: Array<number> = [1, 4, 2, 3, 6, 2];
  public yield: string = '$' + (this.yieldOptionsSeries.reduce((a, b) => a + b, 0) * 10000).toLocaleString();

  public interval: any = {};

  private pageTitleConfig: IPageTitleConfig;

  constructor(
    private sidebarService: SidebarService,
    private cdr: ChangeDetectorRef,
    private toastr: ToastrService,
    private store: SimpleStoreManagerService,
    private lazyLoader: LazyLoaderService
  ) {
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
    setTimeout(function() {
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
    this.updateDashboardGrid();
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
    setTimeout(function() {
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
  private updateDashboardGrid() {
    let that = this;
    this.lazyLoader.load('app-dashboard-grid', this.appDashboardGrid, 'dashboard_grid_config', (_cdRef: any) => {
      if (!that.store.has('dashboard_grid_config')) {
        that.store.add('dashboard_grid_config', this.generateGridConfig(), true);
      } else {
        that.store.setIn('dashboard_grid_config', [], this.generateGridConfig());
      }
    });
  }
  private generateGridConfig() {
    const rowConfig = {
      row: [
        {
          tiles: [
            {
              config: {
                connector: 'app-detail-titles',
                config: 'dashboard_earning_tile',
                callbackFunction: this.earningCallbackFunction.bind(this, 2000)
              },
              class: 'col-lg-3 col-md-6 col-sm-12'
            },
            {
              config: {
                connector: 'app-detail-titles',
                config: 'dashboard_sales_tile',
                callbackFunction: this.salesCallbackFunction.bind(this, 3000)
              },
              class: 'col-lg-3 col-md-6 col-sm-12'
            },
            {
              config: {
                connector: 'app-detail-titles',
                config: 'dashboard_yield_tile',
                callbackFunction: this.yieldCallbackFunction.bind(this, 2500)
              },
              class: 'col-lg-3 col-md-6 col-sm-12'
            },
            {
              config: {
                connector: 'app-detail-titles',
                config: 'dashboard_profit_tile',
                callbackFunction: this.profitCallbackFunction.bind(this, 4000)
              },
              class: 'col-lg-3 col-md-6 col-sm-12'
            }
          ]
        },
        {
          tiles: [
            {
              config: {
                connector: 'app-chart-tiles',
                config: 'dashboard_chart_tiles',
                callbackFunction: this.appChartCallBack.bind(this)
              },
              class: 'col-lg-6 col-md-12 col-sm-12'
            },
            {
              config: {
                connector: 'app-chart-tiles',
                config: 'dashboard_inventory_tiles',
                callbackFunction: this.inventorySpendData.bind(this)
              },
              class: 'col-lg-6 col-md-12 col-sm-12'
            }
          ]
        }
      ]
    };
    return rowConfig;
  }
  private appChartCallBack(cdref: any) {
    if (!this.store.has('dashboard_chart_tiles')) {
      this.store.add(
        'dashboard_chart_tiles',
        {
          title: 'Spend Analysis',
          chartoptions: this.getSpendAnalysis()
        },
        true
      );
    } else {
      this.store.setIn('dashboard_chart_tiles', [], {
        title: 'Spend Analysis',
        chartoptions: this.getSpendAnalysis()
      });
    }
  }
  private getSpendAnalysis() {
    var labelOption = {
      show: false,
      position: 'insideBottom',
      distance: 15,
      align: 'left',
      verticalAlign: 'middle',
      rotate: '90',
      formatter: '{c}  {name|{a}}',
      fontSize: 16,
      rich: {
        name: {
          textBorderColor: '#065c6f'
        }
      }
    };
    let options: any = {
      color: ['#ed6663', '#ffa372'],
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow'
        }
      },
      legend: {
        data: ['Purchase', 'Sales', 'Yield']
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
          boundaryGap: false,
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
          name: 'Purchase',
          type: 'line',
          barGap: 0,
          label: labelOption,
          data: [320, 332, 301, 334, 390]
        },
        {
          name: 'Sales',
          type: 'line',
          label: labelOption,
          data: [220, 182, 191, 234, 290]
        }
      ]
    };
    return options;
  }
  private inventorySpendData(cdref: any) {
    const chartOptions = {
      title: {
        text: ''
      },
      tooltip: {},
      legend: {
        data: ['Inventory', 'Order'],
        right: 0,
        top: 0
      },
      radar: {
        // shape: 'circle',
        name: {
          textStyle: {
            color: '#fff',
            backgroundColor: '#999',
            borderRadius: 3,
            padding: [3, 5]
          }
        },
        indicator: [
          { name: 'Mumbai', max: 6500 },
          { name: 'Delhi', max: 16000 },
          { name: 'Kolkata', max: 30000 },
          { name: 'Rajashtan', max: 38000 },
          { name: 'Banglore', max: 52000 },
          { name: 'Chennai', max: 25000 }
        ]
      },
      series: [
        {
          name: 'Inventory Vs Order Trend',
          type: 'radar',
          symbolSize: 4,
          // areaStyle: {normal: {}},
          data: [
            {
              value: [4300, 10000, 28000, 35000, 50000, 19000],
              name: 'Inventory'
            },
            {
              value: [5000, 14000, 28000, 31000, 42000, 21000],
              name: 'Order'
            }
          ]
        }
      ]
    };
    if (!this.store.has('dashboard_inventory_tiles')) {
      this.store.add(
        'dashboard_inventory_tiles',
        {
          title: 'Inventory Vs Order Trend',
          chartoptions: chartOptions
        },
        true
      );
    } else {
      this.store.setIn('dashboard_inventory_tiles', [], {
        title: 'Inventory Vs Order Trend',
        chartoptions: chartOptions
      });
    }
    return chartOptions;
  }
  private earningCallbackFunction(tout: number) {
    const that = this;

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
      const arrLen = that.earningOptionsSeries.length;
      if (!that.store.has('dashboard_earning_tile')) {
        that.store.add(
          'dashboard_earning_tile',
          {
            title: 'Orders',
            value: that.earnings,
            details:
              ((that.earningOptionsSeries[arrLen - 1] / that.earningOptionsSeries[arrLen - 2]) * 100).toFixed(2) +
              '% compared to last week',
            chartoptions: that.earningOptions
          },
          true
        );
      } else {
        that.store.setIn('dashboard_earning_tile', [], {
          title: 'Orders',
          value: that.earnings,
          details:
            ((that.earningOptionsSeries[arrLen - 1] / that.earningOptionsSeries[arrLen - 2]) * 100).toFixed(2) +
            '% compared to last week',
          chartoptions: that.earningOptions
        });
      }
      that.cdr.markForCheck();
    }, tout);
    that.cdr.detectChanges();
  }
  private salesCallbackFunction(tout: number) {
    const that = this;

    this.interval = setInterval(() => {
      that.salesOptionsSeries.shift();
      let rand = Math.floor(Math.random() * 11);
      if (!rand) {
        rand = 1;
      }
      that.salesOptionsSeries.push(rand);
      that.salesOptions = that.loadLineAreaChartOptions(that.salesOptionsSeries, '#821752', '#de4463');

      that.sales = '$' + (that.earningOptionsSeries.reduce((a, b) => a + b, 0) * 1000).toLocaleString();
      if (that.store.has('totalSales')) {
        that.store.set('totalSales', that.sales);
      } else {
        that.store.add('totalSales', that.sales);
      }
      const arrLen = that.earningOptionsSeries.length;
      if (!that.store.has('dashboard_sales_tile')) {
        that.store.add(
          'dashboard_sales_tile',
          {
            title: 'SALES',
            value: that.sales,
            details:
              ((that.earningOptionsSeries[arrLen - 1] / that.earningOptionsSeries[arrLen - 2]) * 100).toFixed(2) +
              '% compared to last week',
            chartoptions: that.salesOptions
          },
          true
        );
      } else {
        that.store.setIn('dashboard_sales_tile', [], {
          title: 'SALES',
          value: that.sales,
          details:
            ((that.earningOptionsSeries[arrLen - 1] / that.earningOptionsSeries[arrLen - 2]) * 100).toFixed(2) +
            '% compared to last week',
          chartoptions: that.salesOptions
        });
      }
      that.cdr.markForCheck();
    }, tout);
    that.cdr.detectChanges();
  }
  private profitCallbackFunction(tout: number) {
    const that = this;

    this.interval = setInterval(() => {
      that.profitOptionsSeries.shift();
      let rand = Math.floor(Math.random() * 11);
      if (!rand) {
        rand = 1;
      }
      that.profitOptionsSeries.push(rand);
      that.profitOptions = that.loadLineAreaChartOptions(that.profitOptionsSeries, '#a0c1b8', '#f4ebc1');

      that.profit = '$' + (that.profitOptionsSeries.reduce((a, b) => a + b, 0) * 1000).toLocaleString();
      if (that.store.has('totalProfit')) {
        that.store.set('totalProfit', that.sales);
      } else {
        that.store.add('totalProfit', that.sales);
      }
      const arrLen = that.earningOptionsSeries.length;
      if (!that.store.has('dashboard_profit_tile')) {
        that.store.add(
          'dashboard_profit_tile',
          {
            title: 'PROFIT',
            value: that.profit,
            details:
              ((that.earningOptionsSeries[arrLen - 1] / that.earningOptionsSeries[arrLen - 2]) * 100).toFixed(2) +
              '% compared to last week',
            chartoptions: that.profitOptions
          },
          true
        );
      } else {
        that.store.setIn('dashboard_profit_tile', [], {
          title: 'PROFIT',
          value: that.profit,
          details:
            ((that.earningOptionsSeries[arrLen - 1] / that.earningOptionsSeries[arrLen - 2]) * 100).toFixed(2) +
            '% compared to last week',
          chartoptions: that.profitOptions
        });
      }
      that.cdr.markForCheck();
    }, tout);
    that.cdr.detectChanges();
  }
  private yieldCallbackFunction(tout: number) {
    const that = this;

    this.interval = setInterval(() => {
      that.yieldOptionsSeries.shift();
      let rand = Math.floor(Math.random() * 11);
      if (!rand) {
        rand = 1;
      }
      that.yieldOptionsSeries.push(rand);
      that.yieldOptions = that.loadLineAreaChartOptions(that.yieldOptionsSeries, '#726a95', '#709fb0');

      that.yield = '$' + (that.yieldOptionsSeries.reduce((a, b) => a + b, 0) * 1000).toLocaleString();
      if (that.store.has('totalYield')) {
        that.store.set('totalYield', that.sales);
      } else {
        that.store.add('totalYield', that.sales);
      }
      const arrLen = that.earningOptionsSeries.length;
      if (!that.store.has('dashboard_yield_tile')) {
        that.store.add(
          'dashboard_yield_tile',
          {
            title: 'Yield',
            value: that.yield,
            details:
              ((that.earningOptionsSeries[arrLen - 1] / that.earningOptionsSeries[arrLen - 2]) * 100).toFixed(2) +
              '% compared to last week',
            chartoptions: that.yieldOptions
          },
          true
        );
      } else {
        that.store.setIn('dashboard_yield_tile', [], {
          title: 'Yeild',
          value: that.yield,
          details:
            ((that.earningOptionsSeries[arrLen - 1] / that.earningOptionsSeries[arrLen - 2]) * 100).toFixed(2) +
            '% compared to last week',
          chartoptions: that.yieldOptions
        });
      }
      that.cdr.markForCheck();
    }, tout);
    that.cdr.detectChanges();
  }
}
