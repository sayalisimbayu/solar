import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PageForbiddonErrorComponent } from './page-forbiddon-error.component';

describe('PageForbiddonErrorComponent', () => {
  let component: PageForbiddonErrorComponent;
  let fixture: ComponentFixture<PageForbiddonErrorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PageForbiddonErrorComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageForbiddonErrorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
