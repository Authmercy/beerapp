import { TestBed } from '@angular/core/testing';

import { FournisseurbdService } from './fournisseurbd.service';

describe('FournisseurbdService', () => {
  let service: FournisseurbdService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FournisseurbdService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
