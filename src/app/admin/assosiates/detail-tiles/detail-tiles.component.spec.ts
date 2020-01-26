import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailTilesComponent } from './detail-tiles.component';

describe('DetailTilesComponent', () => {
  let component: DetailTilesComponent;
  let fixture: ComponentFixture<DetailTilesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DetailTilesComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailTilesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
