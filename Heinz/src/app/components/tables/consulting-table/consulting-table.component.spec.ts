import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultingTableComponent } from './consulting-table.component';

describe('ConsultingTableComponent', () => {
  let component: ConsultingTableComponent;
  let fixture: ComponentFixture<ConsultingTableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConsultingTableComponent]
    });
    fixture = TestBed.createComponent(ConsultingTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
