import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { EChartOption } from 'echarts';

@Component({
  selector: 'app-gc',
  templateUrl: './gc.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GCComponent implements OnInit {
  public visitorsOptions: EChartOption = {};
  public visitsOptions: EChartOption = {};
  constructor() {
    this.visitorsOptions = this.loadLineChartOptions([3, 5, 1, 6, 5, 4, 8, 3], '#49c5b6');
    this.visitsOptions = this.loadLineChartOptions([4, 6, 3, 2, 5, 6, 5, 4], '#f4516c');
  }
  ngOnInit(): void {}
  loadLineChartOptions(data: any[], color: string) {
    debugger;
    let chartOption: EChartOption;
    let xAxisData: Array<any> = new Array<any>();

    data.forEach(element => {
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
        formatter: function(params, ticket, callback) {
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
          data: data,
          type: 'line',
          showSymbol: false,
          symbolSize: 1,
          lineStyle: {
            color: color,
            width: 1
          }
        }
      ]
    });
  }
}
