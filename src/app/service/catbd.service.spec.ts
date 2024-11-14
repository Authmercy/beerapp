import { TestBed } from '@angular/core/testing';

import { CatbdService } from './catbd.service';

describe('CatbdService', () => {
  let service: CatbdService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CatbdService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
