import { TestBed } from '@angular/core/testing';

import { DriverGuardService } from './driver-guard.service';

describe('DriverGuardService', () => {
  let service: DriverGuardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DriverGuardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
