import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MapaDatosService {

  latitud: number = -79.5419038;
  longitud: number = -1.8017518;
  // tslint:disable-next-line: variable-name
  marcador_guardado: boolean = false;
  nombre: string = "sin nombre";
  cerrarmodal: number = 0;
  NuevaUbicacion: boolean = false;
  constructor() { }
}
