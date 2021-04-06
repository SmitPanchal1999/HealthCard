import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewProfilePatientComponent } from './view-profile-patient.component';

describe('ViewProfilePatientComponent', () => {
  let component: ViewProfilePatientComponent;
  let fixture: ComponentFixture<ViewProfilePatientComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewProfilePatientComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewProfilePatientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
