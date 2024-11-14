import { TestBed } from '@angular/core/testing';

import { TypebdService } from './typebd.service';

describe('TypebdService', () => {
  let service: TypebdService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TypebdService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
