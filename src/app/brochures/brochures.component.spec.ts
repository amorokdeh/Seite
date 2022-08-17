import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BrochuresComponent } from './brochures.component';

describe('BrochuresComponent', () => {
  let component: BrochuresComponent;
  let fixture: ComponentFixture<BrochuresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BrochuresComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BrochuresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
