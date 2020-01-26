import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PageIsErrorComponent } from './page-is-error.component';

describe('PageIsErrorComponent', () => {
  let component: PageIsErrorComponent;
  let fixture: ComponentFixture<PageIsErrorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PageIsErrorComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageIsErrorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
