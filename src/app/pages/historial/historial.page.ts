import { Component, OnInit, ViewChild } from '@angular/core';
import {AlertController, IonSegment} from '@ionic/angular';
import { detalleHistorial} from "src/app/interface/historial-pedido";
import { Router } from '@angular/router';

@Component({
  selector: 'app-historial',
  templateUrl: './historial.page.html',
  styleUrls: ['./historial.page.scss'],
})
export class HistorialPage implements OnInit {


dataHistorial: detalleHistorial[]=[
  
]
 
  @ViewChild(IonSegment, {static: true}) segment: IonSegment;

  constructor(private alertController: AlertController, private router: Router) { }

  ngOnInit() {
    this.segment.value= 'active';
  }

    async cancelarAlert(){
      const alert = await this.alertController.create({
        header: 'Cancelar Pedido',
        cssClass: 'alertCancel',
        inputs : [
          {
            type:'radio',
            label:'Pedido equivocado',
            value:'pedidoEquivocad'
          },
          {
            type:'radio',
            label:'Repartidor demorado',
            value:'repDemorado'
          }
          ],
        buttons: [
          {
            text: 'Regresar',
            role: 'regresar',
            handler: (blah) => {
              console.log('Regresar, no cancelar');
            }
          }, {
            text: 'Cancelar',
            handler: () => {
              console.log('Cancelar Pedido');
            }
          }
        ]
      });
      await alert.present();
    }

    goCarrito(){
      this.router.navigateByUrl('carrito-compras');
    }

    /*segmentChanged(event){
      const valorSegmento = event.detail.value;

      if (valorSegmento == 'active'){
        this.
      }

      console.log(valorSegmento);
    }*/

}
