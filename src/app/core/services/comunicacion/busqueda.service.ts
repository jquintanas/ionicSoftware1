import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

/**
 *
 * @desc controls the search for products and notifies the subscribed categories
 * @export
 * @class BusquedaService
 */
@Injectable({
  providedIn: 'root'
})

export class BusquedaService {
  private indiceTab: number = 0;
  private productosBuscarArray: string[] = ["", "", "", "", ""];
  private productoSubject = new BehaviorSubject(this.productosBuscarArray[0]);
  private tabSubject = new BehaviorSubject(-1);
  constructor() { }

  generarBusqueda(producto: string) {
    this.productosBuscarArray[this.indiceTab] = producto;
    this.productoSubject.next(this.productosBuscarArray[this.indiceTab]);
  }

  cambioDeTag(indice: number) {
    this.indiceTab = indice;
  }


  busqueda(): Observable<string> {
    return this.productoSubject.asObservable();
  }

  obtenerProductoBuscar() {
    return this.productosBuscarArray[this.indiceTab];
  }

  cambioTabObservador() {
    return this.tabSubject.asObservable();
  }

  cambioTab(indice: number) {
    this.tabSubject.next(indice);
  }
}
