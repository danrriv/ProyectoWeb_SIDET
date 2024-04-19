import { TestBed } from '@angular/core/testing';

import { ApiGensubService } from './api-gensub.service';

describe('ApiGensubService', () => {
  let service: ApiGensubService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiGensubService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
