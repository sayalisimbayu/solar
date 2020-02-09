import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CollepsibleComponent } from './collepsible.component';

describe('CollepsibleComponent', () => {
  let component: CollepsibleComponent;
  let fixture: ComponentFixture<CollepsibleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CollepsibleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CollepsibleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
