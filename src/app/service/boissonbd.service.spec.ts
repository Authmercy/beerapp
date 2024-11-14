import { TestBed } from '@angular/core/testing';

import { BoissonbdService } from './boissonbd.service';

describe('BoissonbdService', () => {
  let service: BoissonbdService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BoissonbdService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
