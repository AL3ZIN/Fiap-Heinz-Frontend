import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ColumnGraphTipoRatingComponent } from './column-graph-tipo-rating.component';

describe('ColumnGraphTipoRatingComponent', () => {
  let component: ColumnGraphTipoRatingComponent;
  let fixture: ComponentFixture<ColumnGraphTipoRatingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ColumnGraphTipoRatingComponent]
    });
    fixture = TestBed.createComponent(ColumnGraphTipoRatingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
