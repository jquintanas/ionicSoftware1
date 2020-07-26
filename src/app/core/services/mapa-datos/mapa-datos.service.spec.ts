import { TestBed } from '@angular/core/testing';

import { MapaDatosService } from './mapa-datos.service';

describe('MapaDatosService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MapaDatosService = TestBed.get(MapaDatosService);
    expect(service).toBeTruthy();
  });
});
