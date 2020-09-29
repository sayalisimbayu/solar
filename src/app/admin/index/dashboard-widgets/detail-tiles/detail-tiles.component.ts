import { Component, OnInit, Input } from '@angular/core';
import { StoreEvent } from '@app/shared/storemanager/models/storeEvent.model';
import { SimpleStoreManagerService } from '@app/shared/storemanager/storemanager.service';
import { EChartOption } from 'echarts';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { IAppDetailTileConfig } from './models/detail-tile.model.interface';

@Component({
  selector: 'app-detail-tiles',
  templateUrl: './detail-tiles.component.html',
  styleUrls: ['./detail-tiles.component.css']
})
export class DetailTilesComponent implements OnInit {
  @Input() storeId: string;
  @Input() scope: any;
  public config: IAppDetailTileConfig;
  public subScription: Subscription;
  public autoResize: boolean = true;

  constructor(private store: SimpleStoreManagerService) {
    this.subScription = new Subscription();
    this.config = {
      chartoptions: {},
      details: '',
      title: '',
      value: 0
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
            this.config = el.changedValue as IAppDetailTileConfig;
          })
        )
        .subscribe()
    );
  }
}
