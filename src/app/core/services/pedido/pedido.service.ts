import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ProductosService } from 'src/app/core/services/cart/productos.service';
import { AlertsService } from 'src/app/core/services/alerts/alerts.service';
import { Alert } from 'selenium-webdriver';

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
  listaProductos: any[];

  constructor(
    private httpClient: HttpClient,
    private productoService: ProductosService,
    private alertService: AlertsService,
  ) {}

  getOrderHistory(headers: any) {
    this.httpClient.get(environment.rutas.urlHistorialUsuario, {headers}).toPromise().then( data => {
      this.setHistory(data);
      console.log(data);
      this.nombreProducto();
    }).catch((err) => {
      console.log(err);
    });
  }

  setHistory(data) {
    for (let i = 0; i < data.length; i++) {
      this.idpedido = data[i].idpedido;
      this.idcompra = data[i].idcompra;
      this.idproducto = (data[i].idproducto).split(',');
      this.cantidad = data[i].cantidad;
      this.subtotal = data[i].subtotal;
      this.cubiertos = data[i].cubiertos;
      this.estado = data[i].estado;
      this.compra = data[i].compra;
    }
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
    this.listaProductos = [];
    console.log(this.idproducto);
    for (let i = 0; i < this.idproducto.length; i++) {
      const idProd = this.idproducto[i];
      console.log(idProd);
      this.productoService.obtenerProductosPorID(idProd).subscribe(
        dt => {
          console.log(dt);
          const productName = dt[0].nombre;
          productoFinal = {
            // tslint:disable-next-line: object-literal-key-quotes
            'producto': productName
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
}
