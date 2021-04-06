import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewProfileDoctorComponent } from './view-profile-doctor.component';

describe('ViewProfileDoctorComponent', () => {
  let component: ViewProfileDoctorComponent;
  let fixture: ComponentFixture<ViewProfileDoctorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewProfileDoctorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewProfileDoctorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
