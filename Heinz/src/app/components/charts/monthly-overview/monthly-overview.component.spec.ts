import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonthlyOverviewComponent } from './monthly-overview.component';

describe('MonthlyOverviewComponent', () => {
  let component: MonthlyOverviewComponent;
  let fixture: ComponentFixture<MonthlyOverviewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MonthlyOverviewComponent]
    });
    fixture = TestBed.createComponent(MonthlyOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
