import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppliancesWidgetComponent } from './appliances-widget.component';

describe('AppliancesWidgetComponent', () => {
  let component: AppliancesWidgetComponent;
  let fixture: ComponentFixture<AppliancesWidgetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppliancesWidgetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppliancesWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
