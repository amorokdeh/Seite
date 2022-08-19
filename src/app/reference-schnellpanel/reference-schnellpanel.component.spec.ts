import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReferenceSchnellpanelComponent } from './reference-schnellpanel.component';

describe('ReferenceSchnellpanelComponent', () => {
  let component: ReferenceSchnellpanelComponent;
  let fixture: ComponentFixture<ReferenceSchnellpanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReferenceSchnellpanelComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReferenceSchnellpanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
