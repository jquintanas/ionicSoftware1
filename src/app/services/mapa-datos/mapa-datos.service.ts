import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MapaDatosService {

  latitud: number;
  longitud: number;
  nombre : string = "sin nombre";

  constructor() { }
}
