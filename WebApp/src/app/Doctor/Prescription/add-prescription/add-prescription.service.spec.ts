import { TestBed } from '@angular/core/testing';

import { AddPrescriptionService } from './add-prescription.service';

describe('AddPrescriptionService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AddPrescriptionService = TestBed.get(AddPrescriptionService);
    expect(service).toBeTruthy();
  });
});
