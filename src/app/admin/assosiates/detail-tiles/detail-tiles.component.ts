import { Component, OnInit, Input } from '@angular/core';
import { EChartOption } from 'echarts';

@Component({
  selector: 'app-detail-tiles',
  templateUrl: './detail-tiles.component.html',
  styleUrls: ['./detail-tiles.component.css']
})
export class DetailTilesComponent implements OnInit {
  @Input() title: string = '';
  @Input() value: string = '';
  @Input() details: string = '';
  @Input() chartOptions: EChartOption = {};

  public autoResize: boolean = true;

  constructor() {}

  ngOnInit() {}
}
