import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ProductosService } from 'src/app/core/services/cart/productos.service';
import { AlertsService } from 'src/app/core/services/alerts/alerts.service';
import { AngularFirestore } from "@angular/fire/firestore";
import { map } from 'rxjs/operators';
import { Pedidos } from 'src/app/core/interface/modelNOSQL/pedido';
import { ProductoCarrito } from 'src/app/core/interface/productoCarrito';
import { DetalleProducto } from 'src/app/core/interface/productoDetalle';
import { Productos } from "src/app/core/interface/modelNOSQL/productos";
import { CarritoService } from 'src/app/core/services/cart/carrito.service';

@Injectable({
  providedIn: 'root'
})
export class PedidoService {
  idpedido: number;
  idcompra: number;
  idproducto: string[];
  cantidad: number[];
  subtotal: number;
  cubiertos: boolean;
  estado: string;
  compra: any;
  entregaDomicilio: string;
  horaEntrega: string;
  listaProductos: any[];
  listaPedidos: object;
  historialInfo: any;
  historialPedido: any;
  listaCant: number[];
  listatmp: any;
  prodCarrito: ProductoCarrito;
  detProducto: DetalleProducto;
  categoria: number;
  producto: Productos;
  cant: number;

  constructor(
    private httpClient: HttpClient,
    private productoService: ProductosService,
    private alertService: AlertsService,
    private db: AngularFirestore,
    private carrito: CarritoService,
  ) { }

  activeOrder(cedula: string) {
    return this.db.collection(environment.nombresTablasFirebase.pedidos, ref => ref.where("idUsuario", "==", cedula))
      .snapshotChanges().pipe(map(pedido => {
        return pedido.map(p => {
          console.log(p.payload.doc.data());
          return p.payload.doc.data() as Pedidos;
        });
      }));
  }

  getOrderHistory() {
    this.httpClient.get(environment.rutas.urlHistorialUsuario).toPromise().then(data => {
      this.listaPedidos = data;
      console.log(this.listaPedidos);
      this.setOrderHistory();
    }).catch((err) => {
      console.log(err);
    });
  }

  setOrderHistory() {
    let infoDatos = {};
    let infoPedido = {};
    this.historialInfo = [];
    this.historialPedido = [];
    console.log(this.historialPedido);
    console.log(this.historialInfo);
    for (let i = 0; i < Object.keys(this.listaPedidos).length; i++) {
      this.setHistory(this.listaPedidos[i]);
      this.nombreProducto(this.idproducto);
      console.log(this.listatmp);
      infoDatos = {
        idPedidoPast: this.idpedido,
        valorTotalPast: this.subtotal,
        metodoEnvioPast: this.entregaDomicilio,
      };
      infoPedido = {
        idPedidoPast: this.idpedido,
        amountPast: this.cantidad,
        listaProductosPass: this.listatmp[i]
      };
      console.log(this.listatmp[i]);
      this.historialPedido.push(infoPedido);
      this.historialInfo.push(infoDatos);
    }
    console.log("historial" + this.historialInfo);
    console.log("historial2" + this.historialPedido);
  }

  setHistory(data) {
    this.idpedido = data.idpedido;
    this.idcompra = data.idcompra;
    this.idproducto = (data.idproducto).split(',');
    this.cantidad = (data.cantidad).split(',');
    this.subtotal = data.subtotal;
    this.cubiertos = data.cubiertos;
    this.estado = data.estado;
    this.compra = data.compra;
    this.setEnvio(this.compra);
  }

  setEnvio(datos) {
    const tmp = datos.entregaDomocilio;
    if (tmp == true) {
      this.entregaDomicilio = "Envio a domicilio";
    } else {
      this.entregaDomicilio = "Retiro local";
    }
  }


  nombreProducto(lista: string[]) {
    const listatmp2 = [];
    this.listatmp = [];
    for (let i = 0; i < lista.length; i++) {
      const idProd = lista[i];
      this.productoService.obtenerProductosPorID(idProd).subscribe(
        dt => {
          const productName = dt[0].nombre;
          listatmp2.push(productName);
          console.log(listatmp2);
        },
        async err => {
          console.log(err);
          await this.alertService.mostrarToastError();
        });
      this.listatmp.push(listatmp2);
      console.log(this.listatmp);
    }
  }

  searchOrder(idPedido: number) {
    this.httpClient.get(environment.rutas.urlHistorialUsuario).toPromise().then(data => {
      this.listaPedidos = data;
      for (let i = 0; i < Object.keys(this.listaPedidos).length; i++) {
        if (idPedido == this.listaPedidos[i].idpedido) {
          this.cant = (this.listaPedidos[i].cantidad).split(',');
          const idprod: string = (this.listaPedidos[i].idproducto).split(',');
          console.log(this.cant);
          console.log(idprod);
          for (let j = 0; j < Object.keys(idprod).length; j++) {
            console.log(idprod[j]);
            this.productoService.obtenerProductosPorID(idprod[j]).subscribe(
              dt => {
                console.log(dt);
                const categoriaID = dt[0].idCategoria;
                this.productoService.obtenerCategorioPorID(categoriaID).subscribe(dt2 => {
                  this.categoria = dt2[0].codigo;
                  console.log(this.categoria);
                  const dataP = {
                    id: idprod[j],
                    Descripcion: dt[0].descripcion,
                    ImagenP: dt[0].foto,
                    Precio: dt[0].precio,
                    Titulo: dt[0].nombre,
                    Favorito: false,
                    categoria: this.categoria,
                    carrusel: dt[0].slide,
                    cantidad: dt[0].stock,
                  };
                  console.log(dataP);
                  const prodFinal = {
                    cantidad: this.cant[j],
                    id: idprod[j],
                    producto: dataP,
                  };
                  this.carrito.agregarAlCarrito(this.categoria, prodFinal);
                });
              }, async err => {
                console.log(err);
                await this.alertService.mostrarToastError();
              });
          }
          return 0;
        }
      }
    });
  }
}
