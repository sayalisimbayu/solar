import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplianceStatusWidgetComponent } from './appliance-status-widget.component';

describe('ApplianceStatusWidgetComponent', () => {
  let component: ApplianceStatusWidgetComponent;
  let fixture: ComponentFixture<ApplianceStatusWidgetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApplianceStatusWidgetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplianceStatusWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
