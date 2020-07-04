import { environment } from "src/environments/environment";
import { MapaDatosService } from "./../../services/mapa-datos/mapa-datos.service";
import { Router } from "@angular/router";
import { ModalController, AlertController } from "@ionic/angular";
import { Component, OnInit } from "@angular/core";
import { MapaMapboxPage } from "./../mapa-mapbox/mapa-mapbox.page";
import { HttpClient } from "@angular/common/http";
import { FormBuilder, Validators, FormGroup, NgModel } from "@angular/forms";
import { AlertsService } from 'src/app/services/alerts/alerts.service';

@Component({
  selector: "app-pedido",
  templateUrl: "./pedido.page.html",
  styleUrls: ["./pedido.page.scss"],
})
export class PedidoPage implements OnInit {
  imagen = false;
  domicilio = false;
  local = false;
  mapa = false;
  mapaicono = false;
  horapedido = false;
  efectivo = false;
  depotran = false;
  envio = false;
  posicionmarcador: String[] = [];
  latlng: string;
  address: string = "";
  referencias = false;
  url_completa: string;
  isNewAddress: boolean;
  newAddressString: string;
  referencesString: string;

  constructor(
    private htttp: HttpClient,
    public modalController: ModalController,
    public alertController: AlertController,
    public router: Router,
    public mapaService: MapaDatosService,
    public alertService : AlertsService
  ) {}

  ngOnInit() {}

  public onOptionsSelected(value: string) {
    if (value == "Domicilio") {
      this.domicilio = true;
      this.local = false;
      this.horapedido = false;
      this.envio = true;
    } else if (value == "Local") {
      this.local = true;
      this.domicilio = false;
      this.horapedido = true;
      this.envio = false;
      this.mapa = false;
      this.referencias = false;
      this.mapaService.NuevaUbicacion = false;
    }
  }
  public onOptionsSelected2(value: string) {
    if (value == "Nueva") {
      this.mapaService.NuevaUbicacion = true;
      this.mapa = true;
      this.isNewAddress = true;
    } else if (value == "Registrada") {
      this.mapaService.NuevaUbicacion = false;
      this.mapa = false;
      this.referencias = false;
      this.isNewAddress = false;
    }
  }

  public onOptionsSelected3(value: string) {
    if (value == "Efectivo") {
      this.efectivo = true;
    } else if (value == "Transferencia" || value == "Deposito") {
      this.efectivo = false;
      this.depotran = true;
    }
  }

  public validation(crtl: NgModel, name: string):string{
    let mensaje:string;
    if(name == "newAddressString"){
      if((crtl.touched || crtl.dirty) && (crtl.errors != null)){
        if (crtl.errors.required != null) {
          mensaje = "Debe ingresar el domicilio";
          return mensaje;  
        }
        if((crtl.touched && crtl.dirty) && (!crtl.hasError('minglength'))){
          mensaje =  "La dirección debe tener más de 10 caracteres";
          return mensaje;  
        }        
      }
    }else if(name == "referencesString"){
      if((crtl.touched || crtl.dirty) && (crtl.errors != null)){
        if (crtl.errors.required != null) {
          mensaje = "Debe ingresar la referencia del domicilio";
          return mensaje;  
        }
        if((crtl.touched && crtl.dirty) && (!crtl.hasError('minglength'))){
          mensaje =  "La referencia debe tener más de 10 caracteres";
          return mensaje;  
        }        
      }
    }  
    return '';
  }
  async openModal() {
    this.referencias = false;
    const modal = await this.modalController.create({
      component: MapaMapboxPage,
    });
    modal.onDidDismiss().then((data) => {
      if (this.mapa == true) {
        this.referencias = true;
        this.posicionmarcador = data.data.split("|");
        this.latlng = this.posicionmarcador[1] + "," + this.posicionmarcador[0];
        this.url_completa =
          this.latlng +
          environment.imgsecondpart +
          this.latlng +
          environment.img_markers;
        if (this.url_completa != "") {
          this.imagen = true;
        }
        
      }
    });

    return await modal.present();
  }

  async purchase() {
    if((this.domicilio == false && this.local == false) && (this.efectivo == false && this.depotran == false)){
      this.alertService.alert("Debe escoger el tipo de entrega y método de pago");
    }else if(this.efectivo == false && this.depotran == false){
      this.alertService.alert("Debe escoger el método de pago");
    }else if(this.domicilio == false && this.local == false){
      this.alertService.alert("Debe escoger el tipo de entrega");
    }else{
      this.verifyData();
    }
    
  }

  async verifyData(){   
    if(this.isNewAddress){
      if (
        this.newAddressString == undefined ||
        this.newAddressString == " " ||
        this.newAddressString == "" ||
        this.newAddressString.length <10|| 
        this.referencesString == undefined ||
        this.referencesString == " " ||
        this.referencesString == "" ||
        this.referencesString.length <10
      ) {
        const alert = await this.alertController.create({
          header: "Error - Datos Incompletos ",
          message:
            "Debe llenar los campos de ubicación solicitados",
          buttons: [
            {
              text: "Aceptar",
    
            },
          ],
        });
        await alert.present();
        
      }else{
        this.detectPayment();
      }
    }else{
      this.detectPayment();
    }  
    
  }

  async detectPayment(){
    if (this.depotran) {
      const alert = await this.alertController.create({
        header: "Cuentas Bancarias",
        message:
          '<p class="title"><strong>Banco Pichincha</strong></p>' +
          '<p class="p">Cuenta de Ahorros #45789657479  FARID ALVARADO CI:1207684521 Omiypali@gmail.com <br></p>' +
          '<p class="title"><strong>Banco Guayaquil</strong></p>' +
          '<p class="p">Cuenta de Ahorros #45789657479  FARID ALVARADO CI:1207684521 Omiypali@gmail.com <br></p>' +
          '<p class="comentario">Envíanos una foto del comprobante del depósito/transferencia para confirmar tu pedido al 0955744347<br> </p>',
        buttons: [
          {
            text: "Aceptar",
            handler: () => {
              this.router.navigateByUrl("/home");
            },
          },
        ],
      });
      await alert.present();
    } else if (this.efectivo) {
      const alert = await this.alertController.create({
        header: "Compra realizada",
        message:
          "Tu compra se realizó con éxito, esperamos que sigas con nosotros",
        buttons: [
          {
            text: "Aceptar",
            handler: () => {
              this.router.navigateByUrl("/historial");
            },
          },
        ],
      });
      await alert.present();
    }else{
      const alert = await this.alertController.create({
        header: "Error - Selección de pago",
        message:
          "Debe escoger el método de pago a efectuar",
        buttons: [
          {
            text: "Aceptar",
          },
        ],
      });
      await alert.present();
    }
  }
}
