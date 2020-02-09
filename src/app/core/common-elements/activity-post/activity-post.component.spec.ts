import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivityPostComponent } from './activity-post.component';

describe('ActivityPostComponent', () => {
  let component: ActivityPostComponent;
  let fixture: ComponentFixture<ActivityPostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActivityPostComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivityPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
