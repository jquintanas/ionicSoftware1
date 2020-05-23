import { Injectable } from '@angular/core';
import { detalleProducto } from "src/app/interface/productoDetalle";
import { BehaviorSubject, Observable } from 'rxjs';
import { productoCarrito } from "src/app/interface/productoCarrito";
import { AngularDelegate } from '@ionic/angular';
@Injectable({
  providedIn: 'root'
})
export class CarritoService {
  private productoDetalle: detalleProducto;
  private mapaProductos: Map<any,any>;
  private cantidad: number =0;
  private cantidadSubject = new BehaviorSubject(this.cantidad);
  private mapaSubject = new BehaviorSubject(this.mapaProductos);
  constructor() { 
    if(this.mapaProductos == null){
      this.mapaProductos = new Map();
    }
  }

  setProductoDetalle(producto: detalleProducto){
    this.productoDetalle = producto;
  }

  getProductoDetalle(){
    return this.productoDetalle;
  }

  agregarAlCarrito(categoria:number, producto:productoCarrito){
    if(this.mapaProductos.get(categoria) == null){
      let mapTmp: Map<string,productoCarrito> = new Map()
      mapTmp.set(producto.id,producto);
      this.mapaProductos.set(categoria,mapTmp);
    }
    else {
      let mTmp: Map<string,productoCarrito> = this.mapaProductos.get(categoria);
      if(mTmp.get(producto.id) == null){
        mTmp.set(producto.id,producto);
      }
      else{
        let productotmp = mTmp.get(producto.id);
        let cant = productotmp.cantidad + producto.cantidad;
        productotmp.cantidad = cant;
        mTmp.set(producto.id,productotmp);
      }
      this.mapaProductos.set(categoria,mTmp);
    }
    this.incrementarCantidad(producto.cantidad);
    this.mapaSubject.next(this.mapaProductos);
  }

  observarCantidad(): Observable<number>{
    return this.cantidadSubject.asObservable();
  }

  private incrementarCantidad(incremento: number){
    this.cantidad += incremento;
    this.cantidadSubject.next(this.cantidad);
  }

  observarCarrito(): Observable<Map<any,any>>{
    return this.mapaSubject.asObservable();
  }

  obtenerCarrito(){
    return this.mapaProductos;
  }

  eliminarProducto(categoria:number, producto: productoCarrito){
    if(this.mapaProductos.get(categoria) != null){
      let tmp: Map<string,productoCarrito> = this.mapaProductos.get(categoria);
      tmp.delete(producto.id);
      this.mapaProductos.set(categoria,tmp);
    }
  }

  borrarCarrito(){
    this.mapaProductos = new Map();
    this.cantidad = 0;
    this.cantidadSubject.next(0);
    this.mapaSubject.next(this.mapaProductos);
  }

}
