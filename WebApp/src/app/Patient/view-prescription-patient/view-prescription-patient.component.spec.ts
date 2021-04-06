import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewPrescriptionPatientComponent } from './view-prescription-patient.component';

describe('ViewPrescriptionPatientComponent', () => {
  let component: ViewPrescriptionPatientComponent;
  let fixture: ComponentFixture<ViewPrescriptionPatientComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewPrescriptionPatientComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewPrescriptionPatientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
