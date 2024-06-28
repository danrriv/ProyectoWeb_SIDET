import { TestBed } from '@angular/core/testing';

import { ApiSubgenreService } from './api-subgenre.service';

describe('ApiSubgenreService', () => {
  let service: ApiSubgenreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiSubgenreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
