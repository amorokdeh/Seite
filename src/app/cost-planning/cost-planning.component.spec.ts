import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CostPlanningComponent } from './cost-planning.component';

describe('CostPlanningComponent', () => {
  let component: CostPlanningComponent;
  let fixture: ComponentFixture<CostPlanningComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CostPlanningComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CostPlanningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
