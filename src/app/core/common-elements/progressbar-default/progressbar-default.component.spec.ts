import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgressbarDefaultComponent } from './progressbar-default.component';

describe('ProgressbarDefaultComponent', () => {
  let component: ProgressbarDefaultComponent;
  let fixture: ComponentFixture<ProgressbarDefaultComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProgressbarDefaultComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProgressbarDefaultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
