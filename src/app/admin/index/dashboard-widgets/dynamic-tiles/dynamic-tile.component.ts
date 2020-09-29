import { AfterViewInit, Component, Input, OnDestroy, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { LazyLoaderService } from '@app/shared/services/lazy-loader.service';
import { dynamicTile } from './dynamic-tile.config';

@Component({
  selector: 'app-dynamic-tile',
  templateUrl: './dynamic-tile.component.html',
  styleUrls: ['./dynamic-tile.component.scss']
})
export class DynamicTile implements OnInit, AfterViewInit, OnDestroy {
  @Input('config') config: dynamicTile;
  @Input('scope') scope: any;
  @ViewChild('dynamicTile', { read: ViewContainerRef, static: true })
  dynamicTile: ViewContainerRef;
  constructor(private lazyLoader: LazyLoaderService) {}
  ngOnInit(): void {}
  ngAfterViewInit(): void {
    this.updateAppChartTile();
  }

  private updateAppChartTile() {
    this.dynamicTile !== undefined && this.dynamicTile.clear();
    this.lazyLoader.load(this.config.connector, this.dynamicTile, this.config.config, (_cdRef: any) => {
      if (this.config && this.config.callbackFunction && typeof this.config.callbackFunction === typeof Function) {
        this.config.callbackFunction(_cdRef);
      }
    });
  }

  ngOnDestroy(): void {}
}
