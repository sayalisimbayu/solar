import { Component, Input, OnInit } from '@angular/core';
import { StoreEvent } from '@app/shared/storemanager/models/storeEvent.model';
import { SimpleStoreManagerService } from '@app/shared/storemanager/storemanager.service';
declare var require: any;
import { EChartOption } from 'echarts';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { IAppChartTileConfig } from './models/row-grid.model.interface';

@Component({
  selector: 'app-chart-tiles',
  templateUrl: './row-grid.component.html',
  styleUrls: ['./row-grid.component.css']
})
export class ChartTilesComponent implements OnInit {
  @Input() storeId: string;
  @Input() scope: any;
  public config: IAppChartTileConfig;
  public subScription: Subscription;

  constructor(private store: SimpleStoreManagerService) {
    this.subScription = new Subscription();
    this.config = {
      chartoptions: {},
      title: ''
    };
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
            this.config = el.changedValue as IAppChartTileConfig;
          })
        )
        .subscribe()
    );
  }
}
