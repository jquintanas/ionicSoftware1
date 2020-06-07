import { environment } from 'src/environments/environment.prod';
import { MapaDatosService } from './../../services/mapa-datos/mapa-datos.service';
import { Router } from '@angular/router';
import { ModalController, AlertController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { MapaMapboxPage} from './../mapa-mapbox/mapa-mapbox.page';
import { HttpClient } from '@angular/common/http';

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
  envio = false;
  posicionmarcador:String[] = [];
  latlng :string;
  address :string = "";
  referencias = false;


  constructor(private htttp: HttpClient , public modalController: ModalController,public alertController:AlertController,public router:Router,public mapaService: MapaDatosService) { }

  ngOnInit() {
  }
  
  
  public onOptionsSelected(value:string) {
    //console.log("the selected value is " + value);
    if(value == 'Domicilio'){
      this.domicilio = true;
      this.local = false;
      this.horapedido = false;
      this.envio = true;
    }else if (value == 'Local'){
      this.local = true;
      this.domicilio = false;
      this.horapedido = true;
      this.envio = false;
      this.mapa = false;
      this.referencias = false;
      this.mapaService.NuevaUbicacion = false;
    }
 }
  public onOptionsSelected2(value:string) {
    //console.log("the selected value is " + value);
    if(value == 'Nueva'){   
      this.mapaService.NuevaUbicacion = true;
      this.mapa = true;
    }else{
      this.mapaService.NuevaUbicacion = false;
      this.mapa = false;
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

  async openModal() {
    this.referencias = false;
    const modal = await this.modalController.create({
      component: MapaMapboxPage,
    });
    modal.onDidDismiss().then((data) =>{
      this.referencias = true;
      this.posicionmarcador = data.data.split('|');
      this.latlng= this.posicionmarcador[1]+','+ this.posicionmarcador[0];
      if( this.mapa == true){
        var gps =  this.posicionmarcador[0]+','+this.posicionmarcador[1];
        var mode = "retrieveAddresses";
        var maxresults = 1;
        var apikey ='br0SMC9w-btXVeA6WT-wYrBTIfogArUcMII7vwnj3CQ';
        console.log(gps);
        var url = "https://reverse.geocoder.ls.hereapi.com/6.2/reversegeocode.json?prox="+gps+"&mode="+mode+"&maxresults="+maxresults+"&apikey="+apikey;
        console.log(url);
        this.htttp.get(url).subscribe((results:any)=>{
          this.address = results.Response.View[0].Result[0].Location.Address.Label;
          console.log(results.Response.View[0].Result[0].Location.Address.Label);
        });
        console.log(this.address);
      }     
    });

    

    return await modal.present();
    
  }

  

  async comprar(){
    if(this.depotran){
      const alert = await this.alertController.create({
        header: 'Cuentas Bancarias',
        message: '<p class="title"><strong>Banco Pichincha</strong></p>'+
                  '<p class="p">Cuenta de Ahorros #45789657479  FARID ALVARADO CI:1207684521 Omiypali@gmail.com <br></p>'+
                  '<p class="title"><strong>Banco Guayaquil</strong></p>'+
                  '<p class="p">Cuenta de Ahorros #45789657479  FARID ALVARADO CI:1207684521 Omiypali@gmail.com <br></p>'+
                  '<p class="comentario">Envíanos una foto del comprobante del depósito/transferencia para confirmar tu pedido al 0955744347<br> </p>',
        buttons: [{
            text:'Aceptar',
            handler: ()=>{
              this.router.navigateByUrl("/home");
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
            this.router.navigateByUrl("/home");
          }
        }]
      });
      await alert.present();
    }
    //this.router.navigateByUrl("/home");

    
  }
}
