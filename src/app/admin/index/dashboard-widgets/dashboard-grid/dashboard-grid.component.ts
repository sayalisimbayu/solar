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

  constructor(private store: SimpleStoreManagerService) {
    this.subScription = new Subscription();
    this.config = {
      row: []
    };
    // this.config = this.generateConfig();
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
  ngAfterViewInit(): void {
    this.config.row.forEach((element: any) => {
      this.rowContainer.createEmbeddedView(this.rowTemplate, { config: element });
    });
  }
  trackbyFn(index: number, a: any, b: any) {
    return index;
  }
}
