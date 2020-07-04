import { Injectable } from '@angular/core';
import { ToastController, AlertController } from '@ionic/angular';
import { LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AlertsService {

  constructor(public loadingController: LoadingController,private toastCtrl: ToastController, private alterCrtl: AlertController) { 

  }

  async presentLoading(mensaje: string) {
    const loading = await this.loadingController.create({
      message: mensaje,
      duration: 2000
    });
    await loading.present();

    //const { role, data } = await loading.onDidDismiss();
    //console.log('Loading dismissed!');
  }
  async presentToast(mensaje:string) {
    let toast = await this.toastCtrl.create({
      message: mensaje,
      duration: 1000,
      position: "middle",
      color: 'dark',
       
    });
  
    toast.present();
  }
  async alert(mensaje:string){
    const alert = await this.alterCrtl.create({
      header: "Error de Compra",
      message:
        mensaje,
      buttons: [
        {
          text: "Aceptar"}
      ],
    });
    await alert.present();
  }
}
