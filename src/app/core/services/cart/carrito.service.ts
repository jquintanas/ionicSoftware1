import { Injectable } from '@angular/core';
import { DetalleProducto } from "src/app/core/interface/productoDetalle";
import { BehaviorSubject, Observable } from 'rxjs';
import { ProductoCarrito } from "src/app/core/interface/productoCarrito";
import { IPedido } from "src/app/core/interface/modelNOSQL/pedido.interface";
import { AngularFirestore } from "@angular/fire/firestore";
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class CarritoService {
  datosPedido: IPedido;
  private productoDetalle: DetalleProducto;
  private mapaProductos: Map<any, any>;
  private cantidad: number = 0;
  private cantidadSubject = new BehaviorSubject(this.cantidad);
  private mapaSubject = new BehaviorSubject(this.mapaProductos);
  constructor(private db: AngularFirestore) {
    if (this.mapaProductos == null) {
      this.mapaProductos = new Map();
    }
  }

  setProductoDetalle(producto: DetalleProducto) {
    this.productoDetalle = producto;
  }

  getProductoDetalle() {
    return this.productoDetalle;
  }

  agregarAlCarrito(categoria: number, producto: ProductoCarrito) {
    if (this.mapaProductos.get(categoria) == null) {
      const mapTmp: Map<string, ProductoCarrito> = new Map();
      mapTmp.set(producto.id, producto);
      this.mapaProductos.set(categoria, mapTmp);
    } else {
      const mTmp: Map<string, ProductoCarrito> = this.mapaProductos.get(categoria);
      if (mTmp.get(producto.id) == null) {
        mTmp.set(producto.id, producto);
      } else {
        const productotmp = mTmp.get(producto.id);
        const cant = productotmp.cantidad + producto.cantidad;
        productotmp.cantidad = cant;
        mTmp.set(producto.id, productotmp);
      }
      this.mapaProductos.set(categoria, mTmp);
    }
    this.incrementarCantidad(producto.cantidad);
    this.mapaSubject.next(this.mapaProductos);
  }

  observarCantidad(): Observable<number> {
    return this.cantidadSubject.asObservable();
  }

  private incrementarCantidad(incremento: number) {
    this.cantidad += incremento;
    this.cantidadSubject.next(this.cantidad);
  }

  observarCarrito(): Observable<Map<any, any>> {
    return this.mapaSubject.asObservable();
  }

  obtenerCarrito() {
    return this.mapaProductos;
  }

  eliminarProducto(categoria: number, producto: ProductoCarrito) {
    if (this.mapaProductos.get(categoria) != null) {
      const tmp: Map<string, ProductoCarrito> = this.mapaProductos.get(categoria);
      tmp.delete(producto.id);
      this.mapaProductos.set(categoria, tmp);
    }
  }

  borrarCarrito() {
    this.mapaProductos = new Map();
    this.cantidad = 0;
    this.cantidadSubject.next(0);
    this.mapaSubject.next(this.mapaProductos);
  }

  getMapaProductos() {
    return this.mapaProductos;
  }

  agregarPedido(data: IPedido) {
    const id = this.db.createId();
    data.idPedido = id;
    return this.db.collection(environment.nombresTablasFirebase.pedidos).doc(id).set(data);
  }

}
