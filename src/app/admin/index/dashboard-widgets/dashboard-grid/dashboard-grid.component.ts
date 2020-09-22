import { AfterViewInit, Component, Input, OnInit, TemplateRef, ViewChild, ViewContainerRef } from '@angular/core';
import { StoreEvent } from '@app/shared/storemanager/models/storeEvent.model';
import { SimpleStoreManagerService } from '@app/shared/storemanager/storemanager.service';
import { title } from 'process';
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
    debugger
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
              config: "config loaded"
            },
            {
              config: "config loaded1"
            },
            {
              config: "config loaded2"
            }
          ]
        },
        {
          tiles: [
            {
              config: "config loaded11"
            },
            {
              config: "config loaded12"
            },
            {
              config: "config loaded13"
            }
          ]
        }
      ]
    }
    return rowConfig;
  }

  trackbyFn(index: number, a: any, b: any){
    return index
  }
}
