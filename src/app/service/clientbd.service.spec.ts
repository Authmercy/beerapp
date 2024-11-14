import { TestBed } from '@angular/core/testing';

import { ClientbdService } from './clientbd.service';

describe('ClientbdService', () => {
  let service: ClientbdService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClientbdService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
