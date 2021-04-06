import { TestBed } from '@angular/core/testing';

import { UploadreportService } from './uploadreport.service';

describe('UploadreportService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UploadreportService = TestBed.get(UploadreportService);
    expect(service).toBeTruthy();
  });
});
