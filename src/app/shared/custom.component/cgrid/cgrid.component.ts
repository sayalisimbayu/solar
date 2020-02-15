import {
  Component,
  Input,
  OnInit,
  OnDestroy,
  ViewChildren,
  QueryList,
  ElementRef,
  ViewChild,
  TemplateRef,
  ViewContainerRef,
  AfterViewInit,
  ChangeDetectorRef
} from '@angular/core';
import { SimpleStoreManagerService } from '@app/shared/storemanager/storemanager.service';
import { ICGridConfig } from './config/config';
import { filter, map } from 'rxjs/operators';
import { StoreEvent } from '@app/shared/storemanager/models/storeEvent.model';
import { AutoUnsubscribe } from '@app/shared/decoraters/decorators';

@Component({
  selector: 'app-c-grid',
  templateUrl: './cgrid.component.html'
})
@AutoUnsubscribe()
export class CGridComponent implements OnInit, AfterViewInit, OnDestroy {
  @Input() storeId: string;
  @ViewChildren('button', { read: true }) buttons: QueryList<any>;
  // @ViewChild('button', { read: ViewContainerRef, static: true }) buttons: ViewContainerRef;
  @ViewChild('deleteTemplate', { read: TemplateRef, static: true }) deleteComponent: TemplateRef<any>;
  @ViewChild('deleteTemplate', { read: TemplateRef, static: true }) checkboxComponent: TemplateRef<any>;
  public config: ICGridConfig;
  public pagebody$: any;

  constructor(private store: SimpleStoreManagerService, private cdref: ChangeDetectorRef) { }
  ngOnDestroy() { }
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.config && this.config.gridHeight && (this.config.gridHeight = '300px');
    this.pagebody$ = this.store.$store
      .pipe(filter((se: { key: string }) => se.key === this.storeId))
      .pipe(
        map((el: StoreEvent) => {
          // if (el.path.length === 0 || (el.path.length === 1 && el.path.indexOf(this.storeId) > -1)) {
          this.config = el.store.value;
          this.cdref.detectChanges();
          // this.loadButtons();
          // }
          // this.store.setIn('categorypageconfig', ['pageHeading'], el.store.value.pageTitle);
          // this.store.setIn('categorypageconfig', ['pageBodyUrl'], el.store.value.pageBodyUrl);
        })
      )
      .subscribe();
  }
  ngAfterViewInit(): void {
    // this.loadButtons();
  }
  public loadButtons() {
    // this.buttons.clear();
    if (this.config.isCheckbox) {
      this.buttons.first.createEmbeddedView(this.checkboxComponent);
    } else if (this.config.isDelete) {
      this.buttons.first.createEmbeddedView(this.deleteComponent);
    }
  }
  public onScroll(event: any) {
    this.config && this.config.functions && this.config.functions.onScroll(this.config.page);
  }
  public delete(event: any, element: any, index: number) {
    if (this.config && this.config.functions && this.config.functions.onDelete(event, element)) {
      this.config.items.splice(index, 1);
    }
  }

  public navigate(event: any, element: any) {
    this.config && this.config.functions && this.config.functions.onSelect(event, element);
  }
}
