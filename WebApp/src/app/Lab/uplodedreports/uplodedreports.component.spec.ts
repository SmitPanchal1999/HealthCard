import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UplodedreportsComponent } from './uplodedreports.component';

describe('UplodedreportsComponent', () => {
  let component: UplodedreportsComponent;
  let fixture: ComponentFixture<UplodedreportsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UplodedreportsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UplodedreportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
