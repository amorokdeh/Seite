import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReferenceAnpressschieneComponent } from './reference-anpressschiene.component';

describe('ReferenceAnpressschieneComponent', () => {
  let component: ReferenceAnpressschieneComponent;
  let fixture: ComponentFixture<ReferenceAnpressschieneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReferenceAnpressschieneComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReferenceAnpressschieneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
