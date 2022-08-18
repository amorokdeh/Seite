import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImprintFooterComponent } from './imprint-footer.component';

describe('ImprintFooterComponent', () => {
  let component: ImprintFooterComponent;
  let fixture: ComponentFixture<ImprintFooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImprintFooterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ImprintFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
