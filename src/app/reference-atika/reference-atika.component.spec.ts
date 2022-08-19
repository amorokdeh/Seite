import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReferenceAtikaComponent } from './reference-atika.component';

describe('ReferenceAtikaComponent', () => {
  let component: ReferenceAtikaComponent;
  let fixture: ComponentFixture<ReferenceAtikaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReferenceAtikaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReferenceAtikaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
