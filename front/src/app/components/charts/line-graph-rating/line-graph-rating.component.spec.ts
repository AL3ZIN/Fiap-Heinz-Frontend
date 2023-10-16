import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LineGraphRatingComponent } from './line-graph-rating.component';

describe('LineGraphRatingComponent', () => {
  let component: LineGraphRatingComponent;
  let fixture: ComponentFixture<LineGraphRatingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LineGraphRatingComponent]
    });
    fixture = TestBed.createComponent(LineGraphRatingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
