import { Router } from '@angular/router';
import { ModalController, AlertController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { MapaMapboxPage} from './../mapa-mapbox/mapa-mapbox.page';
@Component({
  selector: 'app-pedido',
  templateUrl: './pedido.page.html',
  styleUrls: ['./pedido.page.scss'],
})
export class PedidoPage implements OnInit {
  domicilio = false;
  local =false;
  mapa = false;
  mapaicono = false;
  horapedido = false;
  efectivo = false;
  depotran = false;
  constructor(public modalController: ModalController,public alertController:AlertController,public router:Router) { }

  ngOnInit() {
  }
  
  
  public onOptionsSelected(value:string) {
    //console.log("the selected value is " + value);
    if(value == 'Domicilio'){
      this.domicilio = true;
      this.local = false;
    }else if (value == 'Local'){
      this.local = true;
      this.domicilio = false;
      this.horapedido = true;
    }
 }
  public onOptionsSelected2(value:string) {
    //console.log("the selected value is " + value);
    if(value == 'Nueva'){
      console.log("nueva");
    }
  }

  public onOptionsSelected3(value:string) {
    //console.log("the selected value is " + value);
    if(value == 'Efectivo'){
      this.efectivo = true;
    }else if(value == "Transferencia" || value =="Deposito"){
      this.efectivo = false;
      this.depotran = true;
    }
  }

  /*async verMapa() {
    const modal = await this.modalController.create({
      component: MapaMapboxPage,
    });    
    return await modal.present();

  }*/

  async comprar(){
    if(this.depotran){
      const alert = await this.alertController.create({
        header: 'Cuentas Bancarias',
        message: '<p class="title"><strong>Banco Pichincha</strong></p>'+
                  '<p class="p">Cuenta de Ahorros #45789657479  FARID ALVARADO CI:1207684521 Omiypali@gmail.com <br></p>'+
                  '<p class="title"><strong>Banco Guayaquil</strong></p>'+
                  '<p class="p">Cuenta de Ahorros #45789657479  FARID ALVARADO CI:1207684521 Omiypali@gmail.com <br></p>'+
                  '<p class="comentario">Envíanos una foto del comprobante del depósito/transferencia para confirmar tu pedido <br> </p>',
        buttons: [{
            text:'Aceptar',
            handler: ()=>{
              this.router.navigateByUrl("/login");
            }
        }]
      });
      await alert.present();
    }else if(this.efectivo){
      const alert = await this.alertController.create({
        header: 'Compra realizada',
        message: 'Tu compra se realizó con éxito, esperamos que sigas con nosotros',
        buttons: [{
          text:'Aceptar',
          handler: ()=>{
            this.router.navigateByUrl("/home/bebidas");
          }
        }]
      });
      await alert.present();
    }
    

    
  }
}
