import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PageTryLaterComponent } from './page-try-later.component';

describe('PageTryLaterComponent', () => {
  let component: PageTryLaterComponent;
  let fixture: ComponentFixture<PageTryLaterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PageTryLaterComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageTryLaterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
