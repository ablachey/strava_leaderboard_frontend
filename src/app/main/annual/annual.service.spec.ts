import { TestBed, inject } from '@angular/core/testing';

import { AnnualService } from './annual.service';

describe('AnnualService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AnnualService]
    });
  });

  it('should be created', inject([AnnualService], (service: AnnualService) => {
    expect(service).toBeTruthy();
  }));
});
