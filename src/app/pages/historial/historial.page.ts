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
  segment: string = "active";
  private deliveryName: string = "Pedro Riascos";
  private deliveryNumber: string = "+593 123 456 789";
  private idPedido: string = "1234";
  private valorTotal: string = "15.50";
  private metodoEnvio: string = "Envio a domicilio";
  private amount: string = "2";
  private productName: string = "Mojada de chocolate";
  private fechaPedido: string = "Mayo 5, 2020";

  constructor(
    private alertController: AlertController,
    private router: Router) {}

  ngOnInit() {
    this.startTimer(20);
  }

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
}
