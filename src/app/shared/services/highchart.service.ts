import { Injectable } from '@angular/core';
import * as Highcharts from 'highcharts';

@Injectable()
export class HighchartsService {
  charts: any[] = [];
  defaultOptions = {
    chart: {
      type: 'line',
      backgroundColor: '#f4f7f6',
      zoomType: 'x'
    },
    credits: {
      enabled: false
    },
    title: {
      text: ''
    },
    subtitle: {
      text: ''
    },
    xAxis: {
      lineWidth: 0,
      minorGridLineWidth: 0,
      gridLineWidth: 0,
      lineColor: 'transparent',
      tickColor: 'transparent',
      title: {
        text: 'Visitor'
      },
      labels: {
        enabled: false
      }
    },
    yAxis: {
      gridLineInterpolation: 'polygon',
      lineWidth: 0,
      minorGridLineWidth: 0,
      gridLineWidth: 0,
      lineColor: 'transparent',
      title: {
        text: ''
      },
      labels: {
        enabled: false
      }
    },
    legend: {
      enabled: false,
      layout: 'vertical'
    },
    plotOptions: {},
    series: [
      {
        marker: {
          enabled: false
        },
        name: 'Installation',
        data: [0, 10, 34, 20, 56, 67, 23, 12]
      }
    ]
  };

  constructor() {}

  createChart(container: any, options?: any) {
    const opts = !!options ? options : this.defaultOptions;
    const e = document.createElement('div');
    e.style.cssText = 'height: 70px;';
    container.appendChild(e);

    if (!!opts['chart']) {
      opts['chart']['renderTo'] = e;
      opts['chart']['type'] = 'line';
    } else {
      opts['chart'] = {
        type: 'line',
        renderTo: e
      };
    }
    this.charts.push(new Highcharts.Chart(opts));
  }

  removeFirst() {
    this.charts.shift();
  }

  removeLast() {
    this.charts.pop();
  }

  getChartInstances(): number {
    return this.charts.length;
  }

  getCharts() {
    return this.charts;
  }
}
