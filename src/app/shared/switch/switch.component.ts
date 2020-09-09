import { Component, OnInit, OnDestroy, Input, OnChanges, ChangeDetectorRef, Type } from '@angular/core';

@Component({
  selector: 'app-switch',
  templateUrl: './switch.component.html',
  styleUrls: ['./switch.component.scss']
})
export class SwitchComponent implements OnInit, OnDestroy, OnChanges {
  @Input('storeId') storeId: ISwitch;
  public config: ISwitch;
  constructor(private cdRef: ChangeDetectorRef) {}
  ngOnInit(): void {
    this.config = this.storeId;
  }
  ngOnChanges() {}
  onChange(event: any, param: any) {
    if (
      this.config &&
      this.config.events &&
      this.config.events.onChange &&
      typeof this.config.events.onChange === typeof Function
    ) {
      this.config.events.onChange(event, param, this.config);
    }
  }
  ngOnDestroy(): void {}
}
export interface ISwitch {
  cssClass: string;
  size: string;
  isChecked: boolean;
  type: string;
  title: string;
  description: string;
  events: {
    onChange: Function;
  };
}
