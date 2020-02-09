import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SystemWidgetComponent } from './system-widget.component';

describe('SystemWidgetComponent', () => {
  let component: SystemWidgetComponent;
  let fixture: ComponentFixture<SystemWidgetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SystemWidgetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SystemWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
