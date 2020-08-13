import { Component, OnInit } from '@angular/core';
import { IonSegment } from '@ionic/angular';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { HistorialService } from 'src/app/core/services/user/historial.service';
import { AlertsService } from 'src/app/core/services/alerts/alerts.service';
import { CarritoService } from 'src/app/core/services/cart/carrito.service';
import { ProductosService } from 'src/app/core/services/cart/productos.service';
import { RepartidorService } from 'src/app/core/services/repartidor/repartidor.service';

@Component({
  selector: 'app-historial',
  templateUrl: './historial.page.html',
  styleUrls: ['./historial.page.scss'],
})

export class HistorialPage implements OnInit {
  time: BehaviorSubject<string> = new BehaviorSubject('00');
  timer: number;
  segment: string = "active";
  private deliveryName: string = "Pedro Riascos";
  private deliveryNumber: string = "+593 123 456 789";
  private idPedido: string;
  private valorTotal: number;
  private metodoEnvio: string = "";
  private amount: number[];
  private productID: string[];
  private fechaPedido: string = "";
  private metodoPago = "";
  private direccionEnvio: string;
  private cubiertos: string;
  private hora: Date;
  private productName: any;

  constructor(
    private historialService: HistorialService,
    private alertService: AlertsService,
    private router: Router,
    private carritoService: CarritoService,
    private productoService: ProductosService,
    private repartidorService: RepartidorService,
  ) { }

  ngOnInit() {
    this.startTimer(20);
    this.setOrderInfo();
    this.nombreProducto();
    this.valorTotal = this.carritoService.datosPedido.total;
    this.amount = this.carritoService.datosPedido.cantidades;
    this.idPedido = this.carritoService.datosPedido.idPedido;
    this.hora = this.carritoService.datosPedido.horaDeRetiro;
  }

  cancelAlert() {
    this.alertService.cancelAlert();
  }

  goCarrito() {
    this.router.navigateByUrl('carrito-compras');
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

  controlProgressBar(estado: string) {
    if (estado == "alistando") {
      this.startTimer(15);
    } else if (estado == "enviando") {
      this.startTimer(10);
    }
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
      this.historialService.obtenerHistorial().toPromise().then(
        data => {
          console.log(data);
        }
      ).catch(
        err => {
          console.log(err);
        }
      );
    }
  }

  nombreProducto() {
    this.productID = this.carritoService.datosPedido.productos;
    for (let i = 0; i < this.productID.length; i++) {
      const idProd = this.productID[i];
      this.productoService.obtenerProductosPorID(idProd).subscribe(
        dt => {
          this.productName = dt[0].nombre;
          console.log(this.productName);
        },
        async err => {
          console.log(err);
          await this.alertService.mostrarToastError();
        }
      );
    }
  }

  setDeliveryMan() {
    this.repartidorService.obtenerRepartidorPorIdPedido(this.idPedido).subscribe(
      dt => {
        this.deliveryName = dt[0].nombre + " " + dt[0].apellido;
        this.deliveryNumber = dt[0].telefono;
      },
      async err => {
        console.log(err);
        await this.alertService.mostrarToastError();
      }
    );
  }

  setOrderInfo() {
    if (this.carritoService.datosPedido.isDomicilio == true) {
      this.metodoEnvio = "Envio a domiclio";
      this.direccionEnvio = this.carritoService.datosPedido.direccionEntrega;
    } else {
      this.metodoEnvio = "Retiro Local";
      this.direccionEnvio = "Jaime Roldós Avenue 220, Babahoyo";
    }

    if (this.carritoService.datosPedido.isEfectivo == true) {
      this.metodoPago = "Efectivo";
    } else {
      this.metodoPago = "Deposito/ Transferencia";
    }

    if (this.carritoService.datosPedido.cubiertos == true) {
      this.cubiertos = "Si";
    } else {
      this.cubiertos = "No";
    }
  }
}
