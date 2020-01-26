import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PageLockscreenComponent } from './page-lockscreen.component';

describe('PageLockscreenComponent', () => {
  let component: PageLockscreenComponent;
  let fixture: ComponentFixture<PageLockscreenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PageLockscreenComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageLockscreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
