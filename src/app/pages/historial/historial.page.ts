import { Component, OnInit } from '@angular/core';
import { IonSegment } from '@ionic/angular';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { AlertsService } from 'src/app/core/services/alerts/alerts.service';
import { CarritoService } from 'src/app/core/services/cart/carrito.service';
import { ProductosService } from 'src/app/core/services/cart/productos.service';
import { RepartidorService } from 'src/app/core/services/repartidor/repartidor.service';
import { PedidoService } from 'src/app/core/services/pedido/pedido.service';
import { UserInfoService } from 'src/app/core/services/userInfo/user-info.service';
import { Pedidos } from 'src/app/core/interface/modelNOSQL/pedido';
import { NovedadesService } from 'src/app/core/services/novedades/novedades.service';
@Component({
  selector: 'app-historial',
  templateUrl: './historial.page.html',
  styleUrls: ['./historial.page.scss'],
})

/**
 * @classdesc Container class of HistorialComponent.
 * @desc Creation Date: 08/20/2020
 * @class
 * @public
 * @version 1.0.0
 * @author Francesca Man Ging <fman@espol.edu.ec>
 */

export class HistorialPage implements OnInit {
  time: BehaviorSubject<string> = new BehaviorSubject('00');
  timer: number;
  segment: string = "active";
  deliveryName: string = "Delivery delivery";
  deliveryNumber: string = "";
  idPedido: string;
  valorTotal: number;
  metodoEnvio: string = "";
  amount: number[];
  productID: string[];
  fechaPedido: string = "";
  metodoPago = "";
  direccionEnvio: string;
  cubiertos: string;
  hora: Date;
  productName: any;
  cancelButtonHidden: boolean = true;
  estadoPedido: number;
  productNamePast: string[];
  listaProductos: any;
  visible: string;
  listaPedidos: any;
  pedidoAct: Pedidos;
  mostrarBoton: string;
  tmp: any[];
  constructor(
    private alertService: AlertsService,
    private router: Router,
    private productoService: ProductosService,
    private repartidorService: RepartidorService,
    private pedidoService: PedidoService,
    private userInfo: UserInfoService,
    private novedadService: NovedadesService,
  ) { }

  ngOnInit() {
    this.pedidoService.getOrderHistory();
    this.segment = 'active';
    this.setDeliveryMan();
    this.pedidoService.activeOrder(this.userInfo.cedula)
      .subscribe((dt) => {
        this.pedidoAct = dt[0];
        console.log(this.pedidoAct);
        if (dt.length > 0) {
          this.visible = "yes";
          this.estadoPedido = 0;
          this.startTimer(20);
          this.setOrderInfo();
          this.nombreProducto();
          this.getOrderState(this.pedidoAct.estadoDelPedido);
          this.getEstadoByIDPedido(this.pedidoAct.idPedido);
        } else {
          this.visible = "no";
          this.estadoPedido = 4;
        }
      });
  }

  /**
     *
     * @desc cancelAlert and creat novelty
     * @memberof HistorialPage
     */

  async cancelAlert() {
    const desc = await this.alertService.cancelAlert();
    const novedad = {
      idusuarioReporta: this.userInfo.cedula,
      idusuarioReportado: "0968645215",
      descripcion: desc
    };
    console.log(novedad);
    this.novedadService.createNovelty(novedad);
    this.router.navigateByUrl("/");
  }

  /**
    *
    * @desc repeat order
    * @param {number} idpedido
    * @memberof HistorialPage
    */
  public repertirCompra(idpedido: number) {
    console.log(idpedido);
    for (let i = 0; i < Object.keys(this.pedidoService.historialPedido).length; i++) {
      const listatmp = this.pedidoService.historialPedido;
      if (idpedido == listatmp[i].idPedidoPast) {
        this.pedidoService.searchOrder(idpedido);
        this.router.navigateByUrl('carrito-compras');
        return 0;
      }
    }
  }

  startTimer(duration: number) {
    this.timer = duration * 60;
    setInterval(() => {
      this.updateTimeValue();
    }, 1000);
  }

  ionViewDidEnter() {
    this.startTimer(20);
  }

  updateTimeValue() {
    let minutes: any = this.timer / 60;
    let seconds: any = this.timer % 60;

    minutes = String('0' + Math.floor(minutes)).slice(-2);
    seconds = String('0' + Math.floor(seconds)).slice(-2);

    const text = minutes + ' MINUTOS';
    this.time.next(text);

    --this.timer;
  }

  cambioSegment(event: any) {
    console.log(event.detail.value);
    if (event.detail.value == "past") {
      this.listaPedidos = this.pedidoService.historialInfo;
    }
  }

  nombreProducto() {
    this.productID = this.pedidoAct.productos;
    const cant = this.pedidoAct.cantidades;
    let productoFinal = {};
    this.listaProductos = [];
    for (let i = 0; i < this.productID.length; i++) {
      const idProd = this.productID[i];
      this.productoService.obtenerProductosPorID(idProd).subscribe(
        dt => {
          this.productName = dt[0].nombre;
          productoFinal = {
            cantidad: cant[i],
            producto: this.productName
          };
          this.listaProductos.push(productoFinal);
          console.log(this.listaProductos);
        },
        async err => {
          console.log(err);
          await this.alertService.mostrarToastError();
        }
      );
    }
  }

  /**
   *
   * @desc set DeliveryMan Info to active order
   * @returns
   * @memberof HistorialPage
   */

  setDeliveryMan() {
    this.repartidorService.obtenerRepartidores().subscribe(
      dt => {
        const idpedprueba = "eSmMIQYPQQVDL8MYhyL1";
        const listaRepartidores = dt;
        console.log(listaRepartidores);
        for (let i = 0; i < listaRepartidores.length; i++) {
          console.log(listaRepartidores[i]);
          console.log(listaRepartidores[i].pedidos);
          const listaPedRep = listaRepartidores[i].pedidos;
          for (let j = 0; j < listaPedRep.length; j++) {
            this.tmp = listaRepartidores[j].pedidos;
            // const tmp2 = this.tmp[j].idPedido;
            if (this.idPedido === this.tmp[j].idPedido) {
              this.deliveryName = listaRepartidores[i].nombre + " " + listaRepartidores[i].apellido;
              this.deliveryNumber = listaRepartidores[i].telefono;
            }
          }
        }
      },
      async err => {
        console.log(err);
        await this.alertService.mostrarToastError();
      }
    );
  }

  setOrderInfo() {
    if (this.pedidoAct.isDomicilio == true) {
      this.metodoEnvio = "Envio a domiclio";
      const Address = this.pedidoAct.direccionEntrega;
      const obj = JSON.parse(Address);
      this.direccionEnvio = obj.direccion;
    } else {
      this.metodoEnvio = "Retiro Local";
      this.direccionEnvio = "Jaime Roldós Avenue 220, Babahoyo";
    }

    if (this.pedidoAct.isEfectivo == true) {
      this.metodoPago = "Efectivo";
    } else {
      this.metodoPago = "Deposito/ Transferencia";
    }

    if (this.pedidoAct.cubiertos == true) {
      this.cubiertos = "Si";
    } else {
      this.cubiertos = "No";
    }
    this.valorTotal = this.pedidoAct.total;
    this.idPedido = this.pedidoAct.idPedido;
  }

  getOrderState(estado: number) {
    if (estado == 0) {
      this.startTimer(17);
      this.mostrarBoton = 'yes';
    } else if (estado == 1) {
      this.startTimer(15);
      this.mostrarBoton = 'no';
    } else if (estado == 2) {
      this.startTimer(10);
      this.mostrarBoton = 'no';
    }
  }

  getEstadoByIDPedido(idPedido: string) {
    this.repartidorService.obtenerEstadoPorIdPedido(idPedido)
      .subscribe(dt => {
        this.estadoPedido = dt[0].estadoDelPedido;
      },
        async err => {
          console.log(err);
          await this.alertService.mostrarToastError();
        });
  }

  irAlHome() {
    this.router.navigateByUrl("/");
  }

  /**
   *
   * @desc See order detail
   * @param {number} idpedido
   * @memberof HistorialPage
   */

  verDetalle(idpedido: number) {
    for (let i = 0; i < Object.keys(this.pedidoService.historialPedido).length; i++) {
      const listatmp = this.pedidoService.historialPedido;
      if (idpedido == listatmp[i].idPedidoPast) {
        for (let j = 1; j < Object.keys(listatmp[i].listaProductosPass).length; j++) {
          let producto = listatmp[i].amountPast[0] + " " +
            listatmp[i].listaProductosPass[0] + "<br>";
          producto = producto + "<br>" + listatmp[i].amountPast[0] + " " + listatmp[i].listaProductosPass[j];
          this.alertService.alert("DETALLE PEDIDO", producto);
        }
        return 0;
      }
    }
  }

}
