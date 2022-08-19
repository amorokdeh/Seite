import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReferenceKassetteComponent } from './reference-kassette.component';

describe('ReferenceKassetteComponent', () => {
  let component: ReferenceKassetteComponent;
  let fixture: ComponentFixture<ReferenceKassetteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReferenceKassetteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReferenceKassetteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
