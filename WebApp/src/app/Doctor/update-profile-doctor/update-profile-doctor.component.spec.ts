import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateProfileDoctorComponent } from './update-profile-doctor.component';

describe('UpdateProfileDoctorComponent', () => {
  let component: UpdateProfileDoctorComponent;
  let fixture: ComponentFixture<UpdateProfileDoctorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateProfileDoctorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateProfileDoctorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
