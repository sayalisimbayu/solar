import { Component, Input, OnInit } from '@angular/core';
import { StoreEvent } from '@app/shared/storemanager/models/storeEvent.model';
import { SimpleStoreManagerService } from '@app/shared/storemanager/storemanager.service';
import { title } from 'process';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { IDashboardGridConfig } from './models/dashboard-grid.model.interface';

@Component({
  selector: 'app-chart-tiles',
  templateUrl: './dashboard-grid.component.html',
  styleUrls: ['./dashboard-grid.component.css']
})
export class DashboardGridComponent implements OnInit {

  @Input() storeId: string;
  @Input() scope: any;
  public config: IDashboardGridConfig;
  public subScription: Subscription;

  constructor(
    private store: SimpleStoreManagerService
  ) {
    this.subScription = new Subscription();
    this.config = {
      row: []
    };
    this.config = this.generateConfig();
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
  }
  generateConfig() {
    let rowConfig: IDashboardGridConfig = {
      row: [
        {
          tiles: [
            {
              config: null
            },
            {
              config: null
            },
            {
              config: null
            }
          ]
        },
        {
          tiles: [
            {
              config: null
            },
            {
              config: null
            },
            {
              config: null
            }
          ]
        }
      ]
    }
    return rowConfig;
  }
}
