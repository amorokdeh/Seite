import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PerformanceTextsComponent } from './performance-texts.component';

describe('PerformanceTextsComponent', () => {
  let component: PerformanceTextsComponent;
  let fixture: ComponentFixture<PerformanceTextsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PerformanceTextsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PerformanceTextsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
