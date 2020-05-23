import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BusquedaService {
  //private productoBuscar: string = "";
  private indiceTab: number =0;
  private productosBuscarArray: string[]=["","","","",""];
  private productoSubject = new BehaviorSubject(this.productosBuscarArray[0]);
  constructor() { }

  generarBusqueda(producto: string){
    //this.productoBuscar = producto;
    this.productosBuscarArray[this.indiceTab] = producto;
    this.productoSubject.next(this.productosBuscarArray[this.indiceTab]);
  }

  cambioDeTag(indice:number){
    this.indiceTab = indice;
  }


  busqueda(): Observable<string>{
    return this.productoSubject.asObservable();
  }

  obtenerProductoBuscar(){
    return this.productosBuscarArray[this.indiceTab];
  }

}
