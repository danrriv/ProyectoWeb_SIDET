import { TestBed } from '@angular/core/testing';

import { ApiGenusService } from './api-genre.service';

describe('ApiGenusService', () => {
  let service: ApiGenusService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiGenusService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
