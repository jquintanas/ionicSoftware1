import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ProductosService } from 'src/app/core/services/cart/productos.service';
import { AlertsService } from 'src/app/core/services/alerts/alerts.service';
import { AngularFirestore } from "@angular/fire/firestore";
import { map } from 'rxjs/operators';
import { Pedidos } from 'src/app/core/interface/modelNOSQL/pedido';

@Injectable({
  providedIn: 'root'
})
export class PedidoService {
  idpedido: number;
  idcompra: number;
  idproducto: string[];
  cantidad: number [];
  subtotal: number;
  cubiertos: boolean;
  estado: string;
  compra: any;
  entregaDomicilio: string;
  horaEntrega: string;
  listaProductos: any [];
  listaPedidos: object;
  historialInfo: any;
  historialPedido: any;
  listaCant: number[];

  constructor(
    private httpClient: HttpClient,
    private productoService: ProductosService,
    private alertService: AlertsService,
    private db: AngularFirestore
  ) { }

  activeOrder(cedula: string) {
    return this.db.collection(environment.nombresTablasFirebase.pedidos, ref => ref.where("idUsuario", "==", cedula))
    .snapshotChanges().pipe(map(pedido => {
      return pedido.map(p => {
        console.log( p.payload.doc.data());
        return p.payload.doc.data() as Pedidos;
      });
    }));
  }

  getOrderHistory() {
    this.httpClient.get(environment.rutas.urlHistorialUsuario).toPromise().then(data => {
      this.listaPedidos = data;
      console.log(this.listaPedidos); // BIEN
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
      // this.nombreProducto();
      infoDatos = {
        idPedidoPast: this.idpedido,
        valorTotalPast: this.subtotal,
        metodoEnvioPast: this.entregaDomicilio,
      };
      infoPedido = {
        amountPast: this.cantidad,
        listaProductosPass: this.idproducto
      };
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

/*
  nombreProducto() {
    this.listaProductos = [];
    console.log("inicio");
    for (let i = 0; i < this.idproducto.length; i++) {
      console.log('for');
      const idProd = this.idproducto[i];
      this.productoService.obtenerProductosPorID(idProd).subscribe(
        dt => {
          console.log("dentro de get info");
          const productName = dt[0].nombre;
          this.listaProductos.push(productName);
          console.log(this.listaProductos);
        },
        async err => {
          console.log(err);
          console.log(this.listaProductos);
          await this.alertService.mostrarToastError();
        });
    }
  }*/
}
