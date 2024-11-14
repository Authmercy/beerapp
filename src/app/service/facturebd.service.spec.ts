import { TestBed } from '@angular/core/testing';

import { FacturebdService } from './facturebd.service';

describe('FacturebdService', () => {
  let service: FacturebdService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FacturebdService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
