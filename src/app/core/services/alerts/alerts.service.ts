import { Injectable } from '@angular/core';
import { ToastController, AlertController } from '@ionic/angular';
import { LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})

/**
 * @classdesc Container class of Alert Service.
 * @desc Creation Date: 08/20/2020
 * @class
 * @public
 * @version 1.0.0
 * @author Francesca Man Ging <fman@espol.edu.ec>
 */

export class AlertsService {
cancelMotive: string;
descripcion: any;

  constructor(
    public loadingController: LoadingController,
    private toastCtrl: ToastController,
    private alterCrtl: AlertController) {

  }

  async presentLoading(mensaje: string) {
    const loading = await this.loadingController.create({
      message: mensaje,
      duration: 2000
    });
    await loading.present();
  }

  async presentToast(mensaje: string) {
    const toast = await this.toastCtrl.create({
      message: mensaje,
      duration: 1000,
      position: "bottom"

    });

    toast.present();
  }

  async alert(titulo: string, mensaje: string) {
    const alert = await this.alterCrtl.create({
      cssClass: "alertCustom",
      header: titulo,
      message:
        mensaje,
      buttons: [
        {
          text: "Aceptar"
        }
      ],
    });
    await alert.present();
  }

  async mostrarToastError() {
    const toast = await this.toastCtrl.create({message: "Algo salio mal, por favor inténtenlo de nuevo.", duration: 2000});
    await toast.present();
  }

  /**
   *
   * @description Alert when an order is Cancel
   * @returns boolean
   */


  async cancelAlert() {
    let motiveCancel;
    const motivo = new Promise <String>(resolve => motiveCancel = resolve);
    const alert = await this.alterCrtl.create({
      cssClass: 'alertCancel',
      header: 'Cancelar Pedido',
      inputs: [
        {
          type: 'radio',
          name: 'motivo',
          label: 'Pedido equivocado',
          value: 'pedido equivocado'
        },
        {
          type: 'radio',
          name: 'motivo',
          label: 'Pedido demorado',
          value: 'Pedido demorado'
        }
      ],
      buttons: [
        {
          text: 'Volver',
          role: 'regresar',
          handler: () => motiveCancel("false")
        }, {
          text: 'Enviar',
          role: 'cancelar',
          handler: (data) => motiveCancel(data)
        }
      ]
    });
    await alert.present();
    return motivo;
  }
}
