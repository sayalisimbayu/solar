import { AfterViewInit, Component, Input, OnInit, TemplateRef, ViewChild, ViewContainerRef } from '@angular/core';
import { StoreEvent } from '@app/shared/storemanager/models/storeEvent.model';
import { SimpleStoreManagerService } from '@app/shared/storemanager/storemanager.service';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { IDashboardGridConfig } from './models/dashboard-grid.model.interface';

@Component({
  selector: 'app-dashboard-grid',
  templateUrl: './dashboard-grid.component.html',
  styleUrls: ['./dashboard-grid.component.scss']
})
export class DashboardGridComponent implements OnInit, AfterViewInit {

  @Input() storeId: string;
  @Input() scope: any;
  public config: IDashboardGridConfig;
  public subScription: Subscription;
  public Componentscope: any = this;

  @ViewChild('rowContainer', { read: ViewContainerRef, static: true }) rowContainer: ViewContainerRef;
  @ViewChild('rowTemplate', { static: true }) rowTemplate: TemplateRef<any>;

  constructor(
    private store: SimpleStoreManagerService
  ) {
    this.subScription = new Subscription();
    this.config = {
      row: []
    };
    this.config = this.generateConfig();
    // this.config.row.forEach((element: any) => {
    //   this.rowContainer.createEmbeddedView(this.rowTemplate, {config: element});
    // });
  }

  ngOnInit() {
    let that = this;
    if (this.store.has(this.storeId)) {
      this.config = this.store.getByKey(this.storeId);
    }
    this.subScription.add(
      this.store.$store
        .pipe(filter((el: StoreEvent) => el.key === this.storeId))
        .pipe(
          map((el: StoreEvent) => {
            this.config = el.changedValue as IDashboardGridConfig;
          })
        )
        .subscribe()
    );
  };
  ngAfterViewInit(): void {
    this.config = this.generateConfig();
    this.config.row.forEach((element: any) => {
      this.rowContainer.createEmbeddedView(this.rowTemplate, {config: element});
    });
  }
  generateConfig() {
    let rowConfig: IDashboardGridConfig = {
      row: [
        {
          tiles: [
            {
              config: {
                connector : 'app-chart-tiles',
                config: 'dashboard_chart_tiles',
                callbackFunction: this.appChartCallBack.bind(this)
              },
              title: "Tile 1",
              class: ""
            },
            {
              config: {
                connector : 'app-chart-tiles',
                config: 'dashboard_chart_tiles',
                callbackFunction: this.appChartCallBack.bind(this)
              },
              title: "tile 2",
              class: ""
            },
            {
              config: {
                connector : 'app-chart-tiles',
                config: 'dashboard_chart_tiles',
                callbackFunction: this.appChartCallBack.bind(this)
              },
              title: "title 3",
              class: ""
            }
          ]
        },
        {
          tiles: [
            {
              config: {
                connector : 'app-chart-tiles',
                config: 'dashboard_chart_tiles',
                callbackFunction: this.appChartCallBack.bind(this)
              },
              title: "title21",
              class: ""
            },
            {
              config: {
                connector : 'app-chart-tiles',
                config: 'dashboard_chart_tiles',
                callbackFunction: this.appChartCallBack.bind(this)
              },
              title: "title22",
              class: ""
            },
            {
              config: {
                connector : 'app-chart-tiles',
                config: 'dashboard_chart_tiles',
                callbackFunction: this.appChartCallBack.bind(this)
              },
              title: "title22",
              class: ""
            }
          ]
        }
      ]
    }
    return rowConfig;
  }

  appChartCallBack(cdref: any) {
    if (!this.store.has('dashboard_chart_tiles')) {
      this.store.add('dashboard_chart_tiles', {
          title: 'Spend Analysis',
          chartoptions: this.getSpendAnalysis()
      }, true);
  } else {
      this.store.setIn('dashboard_chart_tiles', [], {
          title: 'Spend Analysis',
          chartoptions: this.getSpendAnalysis()
      });
  }
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
  };


  trackbyFn(index: number, a: any, b: any){
    return index
  }
}
