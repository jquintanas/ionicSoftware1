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
  cantidad: number;
  subtotal: number;
  cubiertos: boolean;
  estado: string;
  compra: any;
  entregaDomicilio: string;
  horaEntrega: string;
  listaProductos: any;
  listaPedidos: object;
  historial: any;

  constructor(
    private httpClient: HttpClient,
    private productoService: ProductosService,
    private alertService: AlertsService,
    private db: AngularFirestore
  ) { }

  getOrderHistory() {
    this.httpClient.get(environment.rutas.urlHistorialUsuario).toPromise().then(data => {
      this.listaPedidos = data;
      console.log(this.listaPedidos);
      this.setOrderHistory();
    }).catch((err) => {
      console.log(err);
    });
  }

  setHistory(data) {
    this.idpedido = data.idpedido;
    this.idcompra = data.idcompra;
    this.idproducto = (data.idproducto).split(',');
    this.cantidad = data.cantidad;
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

  nombreProducto() {
    let productoFinal = {};
    for (let i = 0; i < this.idproducto.length; i++) {
      const idProd = this.idproducto[i];
      console.log(idProd);
      this.listaProductos = [];
      this.productoService.obtenerProductosPorID(idProd).subscribe(
        dt => {
          const productName = dt[0].nombre;
          productoFinal = {
            producto: productName
          };
          this.listaProductos.push(productoFinal);
        },
        async err => {
          console.log(err);
          await this.alertService.mostrarToastError();
        }
      );
    }
  }

  setOrderHistory() {
    let infoPedido = {};
    this.historial = [];
    for (let i = 0; i < Object.keys(this.listaPedidos).length; i++) {
      this.setHistory(this.listaPedidos[i]);
      infoPedido = {
        idPedidoPast: this.idpedido,
        valorTotalPast: this.subtotal,
        metodoEnvioPast: this.entregaDomicilio,
        amountPast: this.cantidad,
        listaProductosPass: this.idproducto
      };
      this.historial.push(infoPedido);
      console.log(this.historial);
    }
    this.nombreProducto();
    console.log(this.historial);
  }

  activeOrder(cedula: string) {
    return this.db.collection(environment.nombresTablasFirebase.pedidos, ref => ref.where("idUsuario", "==", cedula))
    .snapshotChanges().pipe(map(pedido => {
      return pedido.map(p => {
        console.log( p.payload.doc.data());
        return p.payload.doc.data() as Pedidos;
      });
    }));
  }

  verDetalle() {
    
  }
}
