import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReferenceProjectsComponent } from './reference-projects.component';

describe('ReferenceProjectsComponent', () => {
  let component: ReferenceProjectsComponent;
  let fixture: ComponentFixture<ReferenceProjectsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReferenceProjectsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReferenceProjectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
