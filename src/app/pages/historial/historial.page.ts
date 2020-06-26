import { Component, OnInit } from '@angular/core';
import {AlertController, IonSegment} from '@ionic/angular';
import { detalleHistorial} from "src/app/interface/historial-pedido";
import { Router } from '@angular/router';
import {BehaviorSubject} from 'rxjs';

@Component({
  selector: 'app-historial',
  templateUrl: './historial.page.html',
  styleUrls: ['./historial.page.scss'],
})
export class HistorialPage implements OnInit {

//TEMPORIZADOR
time: BehaviorSubject<string> = new BehaviorSubject ('00');
timer: number;

dataHistorial: detalleHistorial[]=[
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

]
  
dataMostrar: any[];
segment: string = "active";

  constructor(private alertController: AlertController, private router: Router) { 
    this.dataMostrar = this.dataHistorial;
  }

  ngOnInit() {}

    /*
      Fecha de Creación: 25/05/2020
      Fecha de Modificación: 25/05/2020
      Usuario de creación: Fman
      Usuario de Modificación: Fman
      Alert para cancelar pedido
    */
    async cancelAlert(){
      const alert = await this.alertController.create({
        cssClass: 'alertCancel',
        header: 'Cancelar Pedido',
        inputs : [
          {
            type:'radio',
            name:'motivo',
            label:'Pedido equivocado',
            value:'pedidoEquivocad'
          },
          {
            type:'radio',
            name: 'motivo',
            label:'Repartidor demorado',
            value:'repDemorado'
          }
          ],
        buttons: [
          {
            text: 'Volver',
            role: 'regresar',
            handler: (blah) => {}
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
  
    /*
      Fecha de Creación: 25/05/2020
      Fecha de Modificación: 25/05/2020
      Usuario de creación: Fman
      Usuario de Modificación: Fman
      Alert para ingresar el motivo de la cancelacion del producto
    */
    async motiveAlert(){
      const alert = await this.alertController.create({
        header: 'Motivo',
        inputs : [
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
            }}]
      });
      await alert.present();
    }

    /*
      Fecha de Creación: 25/05/2020
      Fecha de Modificación: 25/05/2020
      Usuario de creación: Fman
      Usuario de Modificación: Fman
      Redireccion a la pagina del Carrito de compras
    */
    goCarrito(){
      this.router.navigateByUrl('carrito-compras');
    }

    /*
      Fecha de Creación: 25/05/2020
      Fecha de Modificación: 25/05/2020
      Usuario de creación: Fman
      Usuario de Modificación: Fman
      Iniciar el temporizador 
      Parámetro de entrada: number
    */
    startTimer(duration: number){
      this.timer= duration * 60;
      setInterval( () => {
        this.updateTimeValue();
      }, 1000);
    }
  
    /*
      Fecha de Creación: 25/05/2020
      Fecha de Modificación: 25/05/2020
      Usuario de creación: Fman
      Usuario de Modificación: Fman
      Activacion para que el temporizador funcione
    */
    updateTimeValue(){
      let minutes: any = this.timer /60;
      let seconds: any = this.timer %60;
  
      minutes = String('0' + Math.floor(minutes)).slice(-2);
      seconds = String('0' + Math.floor(seconds)).slice(-2);
    
      const text = minutes + ' MINUTOS';
      this.time.next(text);
  
      --this.timer;
    }
}
