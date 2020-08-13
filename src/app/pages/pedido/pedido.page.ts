import { environment } from "src/environments/environment";
import { MapaDatosService } from "./../../core/services/mapa-datos/mapa-datos.service";
import { Router } from "@angular/router";
import { ModalController, AlertController, LoadingController } from "@ionic/angular";
import { Component, OnInit } from "@angular/core";
import { MapaMapboxPage } from "./../mapa-mapbox/mapa-mapbox.page";
import { NgModel } from "@angular/forms";
import { AlertsService } from 'src/app/core/services/alerts/alerts.service';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { CarritoService } from 'src/app/core/services/cart/carrito.service';
import { IPedido } from "src/app/core/interface/modelNOSQL/pedido.interface";
import { UserInfoService } from 'src/app/core/services/userInfo/user-info.service';

@Component({
  selector: "app-pedido",
  templateUrl: "./pedido.page.html",
  styleUrls: ["./pedido.page.scss"],
})
export class PedidoPage implements OnInit {
  imagen = false;
  domicilio = false;
  local = false;
  ubicacionRegistrada = false;
  nuevaUbicacion = false;
  mapa = false;
  mapaicono = false;
  horapedido = false;
  efectivo = false;
  depotran = false;
  envio = false;
  posicionmarcador: string[] = [];
  latlng: string;
  address: string = "";
  nuevaDireccionEnvio = false;
  urlCompleta: string;
  isNewAddress: boolean;
  newAddressString: string;
  referencesString: string;
  productos: Map<any, any>;
  total: number = 0;
  costoEnvio: number = 0;
  private datosPedido: IPedido;
  private listaProductos: string[];
  private listaCantidades: number[];
  private totalProductos: number = 0;
  private actual = new Date();
  horaRetiro: any = new Date().setMinutes(this.actual.getMinutes() + 30);
  private cubiertos: string;
  constructor(
    public modalController: ModalController,
    public alertController: AlertController,
    public router: Router,
    public mapaService: MapaDatosService,
    public alertService: AlertsService,
    public authService: AuthService,
    private cartService: CarritoService,  
    private userInfo: UserInfoService,
    private loadingController: LoadingController
  ) { }

  ngOnInit() {
    this.horaRetiro = new Date(this.horaRetiro);
    this.listaProductos = [];
    this.listaCantidades = [];
    this.productos = this.cartService.getMapaProductos();
    for (const clave of this.productos.values()) {
      for (const value of clave.values()) {
        this.total += value.cantidad * value.producto.Precio;
        this.listaProductos.push(value.producto.id);
        this.listaCantidades.push(value.cantidad);
        this.totalProductos += value.cantidad;
      }
    }
  }

  public onOptionsSelected(value: string) {
    if (value === "Domicilio") {
      this.domicilio = true;
      this.local = false;
      this.horapedido = false;
      this.envio = true;
      this.costoEnvio = 1.5;
    } else if (value === "Local") {
      this.local = true;
      this.domicilio = false;
      this.horapedido = true;
      this.envio = false;
      this.mapa = false;
      this.nuevaDireccionEnvio = false;
      this.mapaService.NuevaUbicacion = false;
      this.costoEnvio = 0;
    }
  }
  public onOptionsSelected2(value: string) {
    if (value === "Nueva") {
      this.nuevaUbicacion = true;
      this.mapaService.NuevaUbicacion = true;
      this.mapa = true;
      this.isNewAddress = true;
      this.ubicacionRegistrada = false;
    } else if (value === "Registrada") {
      this.ubicacionRegistrada = true;
      this.nuevaUbicacion = false;
      this.mapaService.NuevaUbicacion = false;
      this.mapa = false;
      this.nuevaDireccionEnvio = false;
      this.isNewAddress = false;
    }
  }

  public onOptionsSelected3(value: string) {
    if (value === "Efectivo") {
      this.efectivo = true;
      this.depotran = false;
    } else if (value === "Transferencia" || value === "Deposito") {
      this.efectivo = false;
      this.depotran = true;
    }
  }

  public validation(crtl: NgModel, name: string): string {
    let mensaje: string;
    if (name === "newAddressString") {
      if ((crtl.touched || crtl.dirty) && (crtl.errors != null)) {
        if (crtl.errors.required != null) {
          mensaje = "Debe ingresar el domicilio";
          return mensaje;
        }
        if ((crtl.touched && crtl.dirty) && (!crtl.hasError('minglength'))) {
          mensaje = "La dirección debe tener más de 10 caracteres";
          return mensaje;
        }
      }
    } else if (name === "referencesString") {
      if ((crtl.touched || crtl.dirty) && (crtl.errors != null)) {
        if (crtl.errors.required != null) {
          mensaje = "Debe ingresar la referencia del domicilio";
          return mensaje;
        }
        if ((crtl.touched && crtl.dirty) && (!crtl.hasError('minglength'))) {
          mensaje = "La referencia debe tener más de 10 caracteres";
          return mensaje;
        }
      }
    }
    return '';
  }
  async openModal() {
    this.nuevaDireccionEnvio = false;
    const modal = await this.modalController.create({
      component: MapaMapboxPage,
    });
    modal.onDidDismiss().then((data) => {
      if (this.mapa === true) {
        this.nuevaDireccionEnvio = true;
        this.posicionmarcador = data.data.split("|");
        this.latlng = this.posicionmarcador[1] + "," + this.posicionmarcador[0];
        this.urlCompleta =
          this.latlng +
          environment.imgsecondpart +
          this.latlng +
          environment.img_markers;
        if (this.urlCompleta !== "") {
          this.imagen = true;
        }

      }
    });

    return await modal.present();
  }

  async purchase() {
    if ((this.domicilio === false && this.local === false) && (this.efectivo === false && this.depotran === false)) {
      this.alertService.alert("Error - Datos incompletos", "Debe escoger el tipo de entrega y método de pago");
    } else if (this.domicilio === false && this.local === false) {
      this.alertService.alert("Error - Datos incompletos", "Debe escoger el tipo de entrega");
    } else if (this.domicilio === true && (this.nuevaUbicacion === false && this.ubicacionRegistrada === false)) {
      this.alertService.alert("Error - Datos incompletos", "Debe escoger la dirección de envío");
    } else if (this.efectivo === false && this.depotran === false) {
      this.alertService.alert("Error - Datos incompletos", "Debe escoger el método de pago");
    } else {
      this.verifyData();
    }

  }

  async verifyData() {
    if (this.isNewAddress) {
      if (this.nuevaDireccionEnvio == false) {
        this.alertService.alert("Error - Datos incompletos", "Debe indicar la ubicación presionando el ícono del mapa ");
      } else {
        if (
          this.newAddressString == undefined ||
          this.newAddressString == " " ||
          this.newAddressString == "" ||
          this.referencesString == undefined ||
          this.referencesString == " " ||
          this.referencesString == ""
        ) {
          this.alertService.alert("Error - Datos incompletos", "Debe llenar los campos solicitados de la nueva dirección ");
        } else if (this.newAddressString.length < 10) {
          this.alertService.alert("Error - Datos incompletos", "La nueva dirección debe tener mas de 10 caracteres");
        } else if (this.referencesString.length < 10) {
          this.alertService.alert("Error - Datos incompletos", "La referencia de la nueva dirección debe tener mas de 10 caracteres");
        } else {
          this.detectPayment();
        }
      }
    } else {
      this.detectPayment();
    }

  }

  onOptionsSelected4(data: any) {
    console.log(data);
    this.cubiertos = data;
  }

  cambioDeHora(event: any) {
    this.horaRetiro = new Date(event.detail.value);
  }
  async detectPayment() {
    const loading = await this.loadingController.create({ message: "Cargando..." });
    await loading.present();
    this.datosPedido = {
      cantidades: this.listaCantidades,
      productos: this.listaProductos,
      idUsuario: this.authService.dataUser.cedula,
      totalProductos: this.totalProductos,
      isDomicilio: this.domicilio,
      isEfectivo: this.efectivo,
      total: this.total + this.costoEnvio
    };
    !this.nuevaUbicacion ? this.datosPedido.direccionDefault = "S" : this.datosPedido.direccionDefault = "N";
    this.cubiertos ? this.datosPedido.cubiertos = true : this.datosPedido.cubiertos = false;
    if (this.nuevaUbicacion) {
      const direc = {
        direccion: this.newAddressString,
        referencia: this.referencesString,
        ubicacion: this.latlng
      };
      this.datosPedido.direccionEntrega = JSON.stringify(direc);
    }
    if (this.local) {
      this.datosPedido.horaDeRetiro = this.horaRetiro;
    }
    this.cartService.datosPedido = this.datosPedido;
    console.log(this.datosPedido);
    await this.cartService.agregarPedido(this.datosPedido).then(
      async data => {
        await loading.dismiss();

        await this.llamarAlerts();
      }
    ).catch(
      err => {
        loading.dismiss();
        console.log(err);
      }
    );
  }

  private async alertBancarias() {
    const alert = await this.alertController.create({
      header: "Cuentas Bancarias",
      message:
        '<p class="title"><strong>Banco Pichincha</strong></p>' +
        '<p class="p">Cuenta de Ahorros #45789657479  FARID ALVARADO CI:1207684521 Omiypali@gmail.com <br></p>' +
        '<p class="title"><strong>Banco Guayaquil</strong></p>' +
        '<p class="p">Cuenta de Ahorros #45789657479  FARID ALVARADO CI:1207684521 Omiypali@gmail.com <br></p>' +
        '<p class="comentario">Envíanos una foto del comprobante del depósito/transferencia para confirmar tu ' +
        'pedido al 0955744347<br> </p>',
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
  }

  private async alertEfectivo() {
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
  }

  private async llamarAlerts() {
    if (this.depotran) {
      await this.alertBancarias();
    } else if (this.efectivo) {
      await this.alertEfectivo();
    } else {
      this.alertService.alert("Error - Selección de pago", "Debe escoger el método de pago a efectuar");
    }
  }
}
