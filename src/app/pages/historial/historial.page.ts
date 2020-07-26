import { Component, OnInit } from '@angular/core';
import { AlertController, IonSegment } from '@ionic/angular';
import { DetalleHistorial } from "src/app/core/interface/historial-pedido";
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-historial',
  templateUrl: './historial.page.html',
  styleUrls: ['./historial.page.scss'],
})

export class HistorialPage implements OnInit {
  time: BehaviorSubject<string> = new BehaviorSubject('00');
  timer: number;

  dataHistorial: DetalleHistorial[] = [
    {
      idpedido: "1406",
      producto: "Mojada de chocolate",
      cantidad: 2,
      valor: 2,
      metodoEnvio: true,
      fecha: "2019-05-12"
    },
    {
      idpedido: "1230",
      producto: "Mojada de chocolate",
      cantidad: 3,
      valor: 2,
      metodoEnvio: true,
      fecha: "2019-05-10"
    },
    {
      idpedido: "1500",
      producto: "Mojada de chocolate",
      cantidad: 2,
      valor: 2,
      metodoEnvio: true,
      fecha: "2019-07-12"
    }

  ];

  dataMostrar: any[];
  segment: string = "active";

  constructor(
    private alertController: AlertController,
    private router: Router) {
    this.dataMostrar = this.dataHistorial;
  }

  ngOnInit() { }

  async cancelAlert() {
    const alert = await this.alertController.create({
      cssClass: 'alertCancel',
      header: 'Cancelar Pedido',
      inputs: [
        {
          type: 'radio',
          name: 'motivo',
          label: 'Pedido equivocado',
          value: 'pedidoEquivocad'
        },
        {
          type: 'radio',
          name: 'motivo',
          label: 'Repartidor demorado',
          value: 'repDemorado'
        }
      ],
      buttons: [
        {
          text: 'Volver',
          role: 'regresar',
          handler: (blah) => { }
        }, {
          text: 'Enviar',
          role: 'cancelar',
          handler: () => {
            this.motiveAlert();
          }
        }
      ]
    });
    await alert.present();
  }

  async motiveAlert() {
    const alert = await this.alertController.create({
      header: 'Motivo',
      inputs: [
        {
          name: 'name1',
          type: 'text',
          placeholder: 'Cuentanos que paso con tu pedido'
        }
      ],
      buttons: [
        {
          text: 'Enviar',
          role: 'cancelar',
          handler: () => {
          }
        }]
    });
    await alert.present();
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

  updateTimeValue() {
    let minutes: any = this.timer / 60;
    let seconds: any = this.timer % 60;

    minutes = String('0' + Math.floor(minutes)).slice(-2);
    seconds = String('0' + Math.floor(seconds)).slice(-2);

    const text = minutes + ' MINUTOS';
    this.time.next(text);

    --this.timer;
  }
}
