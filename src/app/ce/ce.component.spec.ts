import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CEComponent } from './ce.component';

describe('CEComponent', () => {
  let component: CEComponent;
  let fixture: ComponentFixture<CEComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CEComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CEComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
