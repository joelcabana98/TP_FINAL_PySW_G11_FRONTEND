import { TestBed } from '@angular/core/testing';

import { NovedadService } from './novedad.service';

describe('NovedadService', () => {
  let service: NovedadService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NovedadService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
