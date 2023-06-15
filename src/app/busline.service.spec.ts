import { TestBed } from '@angular/core/testing';

import { BuslineService } from './busline.service';

describe('BuslineService', () => {
  let service: BuslineService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BuslineService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
