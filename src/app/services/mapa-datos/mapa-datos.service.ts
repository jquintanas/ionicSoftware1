import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MapaDatosService {

  latitud:number= -79.5419038;
  longitud: number= -1.8017518;
  marcador_guardado : boolean = false;
  nombre : string = "sin nombre";

  constructor() { }
}
