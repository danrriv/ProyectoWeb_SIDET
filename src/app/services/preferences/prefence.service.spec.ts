import { TestBed } from '@angular/core/testing';

import { PrefenceService } from './prefence.service';

describe('PrefenceService', () => {
  let service: PrefenceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PrefenceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
