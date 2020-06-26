import { TestBed } from '@angular/core/testing';

import { AfiliadoService } from './afiliado.service';

describe('AfiliadoService', () => {
  let service: AfiliadoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AfiliadoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
