import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateProfilePatientComponent } from './update-profile-patient.component';

describe('UpdateProfilePatientComponent', () => {
  let component: UpdateProfilePatientComponent;
  let fixture: ComponentFixture<UpdateProfilePatientComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateProfilePatientComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateProfilePatientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
