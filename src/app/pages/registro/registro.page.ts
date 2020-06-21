import { MapaDatosService } from "./../../services/mapa-datos/mapa-datos.service";
import { ModalController, Platform, LoadingController } from "@ionic/angular";
import { Component, OnInit, Renderer2, ElementRef, AfterViewInit, } from "@angular/core";
import { Router } from "@angular/router";
import { FormBuilder, FormGroup, Validators, ValidatorFn, AbstractControl } from "@angular/forms";
import { MapaMapboxPage } from "./../mapa-mapbox/mapa-mapbox.page";
import { AlertsService } from "src/app/services/alerts/alerts.service";
import { HttpClient } from '@angular/common/http';
import { usuarioInterface } from 'src/app/interface/usuarioRegistro';
import { environment } from "src/environments/environment";
import { RegistroService } from 'src/app/services/registro.service';
import { SeguridadService } from 'src/app/services/seguridad.service';


@Component({
  selector: "app-registro",
  templateUrl: "./registro.page.html",
  styleUrls: ["./registro.page.scss"],
})
export class RegistroPage implements OnInit, AfterViewInit {
  imagen = false;
  verubicacion = true;
  form: FormGroup;
  form2: FormGroup;
  paso_formulario: number;
  private emailPattern: any = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  private phonepattern: any = /^(09){1}[0-9]{8}$/;
  img: string = "),pin-s-cafe+e00000(-79.5419038,-1.8017518)/";
  img_markers = ",14,0/300x300@2x?access_token=pk.eyJ1IjoiZGFubnBhcjk2IiwiYSI6ImNrYWJiaW44MjFlc2kydG96YXVxc2JiMHYifQ.iWfA_z-InyvNliI_EysoBw&attribution=false&logo=false";
  url_completa: string;
  latlng: string;
  posicionmarcador: String[] = [];
  address: string = "";

  //variables para peticiones
  private datosUsuario: usuarioInterface;
  constructor(
    public alertsService: AlertsService,
    private formBuilder: FormBuilder,
    private router: Router,
    public modalController: ModalController,
    public mapaDatosService: MapaDatosService,
    public renderer: Renderer2,
    public el: ElementRef,
    private htttp: HttpClient,
    private platform: Platform,
    private registroService: RegistroService,
    private loadingController: LoadingController,
    private seguridad: SeguridadService
  ) {
    this.buildForm();
    this.buildForm2();
    this.paso_formulario = 1;
    this.mapaDatosService.NuevaUbicacion = true;
    this.platform.backButton.subscribeWithPriority(5, () => {
      console.log('Another handler was called!');
    });
    this.platform.backButton.subscribeWithPriority(10, (processNextHandler) => {
      console.log('Handler was called!');

      processNextHandler();
    });
  }

  ngOnInit() { }
  ngAfterViewInit() {
    this.latlng =
      this.mapaDatosService.latitud.toString() +
      "," +
      this.mapaDatosService.longitud.toString();
    this.url_completa = this.latlng + this.img;
  }

  buildForm() {
    this.form = this.formBuilder.group({
      cedula: [
        "",
        [
          Validators.required,
          Validators.maxLength(10),
          Validators.minLength(10)
        ]
      ],
      nombres: ["", [Validators.required, Validators.minLength(4)]],
      apellidos: ["", [Validators.required, Validators.minLength(4)]],
      telefono: [
        "",
        [
          Validators.required,
          Validators.maxLength(10),
          Validators.minLength(10),
          Validators.pattern(this.phonepattern),
        ],
      ],
      correo: [
        "",
        [Validators.required, Validators.pattern(this.emailPattern)],
      ],
      contrasena: ["", [Validators.required, Validators.minLength(8)]],
      contrasenac: [
        "",
        [Validators.required, this.validarContrasena("contrasena")],
      ],
    });
  }

  buildForm2() {
    this.form2 = this.formBuilder.group({
      domicilio: ["", Validators.required],
      referencias: [""],
    });
  }

  save() {
    let clave = this.seguridad.generarHashClave(this.form.get("contrasena").value)
    this.datosUsuario = {
      cedula: this.form.get("cedula").value,
      nombre: this.form.get("nombres").value,
      apellido: this.form.get("apellidos").value,
      telefono: this.form.get("telefono").value,
      email: this.form.get("correo").value,
      contrasenia: clave,
      rol: environment.idRol,
    }
    this.paso_formulario = 2;
  }

  validarContrasena(field_name): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
      let input = control.value;
      let isValid = control.root.value[field_name] == input;
      if (!isValid) {
        return { validarContrasena: { isValid } };
      } else {
        return null;
      }
    };
  }
  salirRegistro() {
    this.router.navigateByUrl("login");
  }

  async save2() {
    let loading = await this.loadingController.create({ message: "Guardando..." });
    await loading.present();
    let direcciones = {
      direccion: this.form2.get("domicilio").value,
      referencia: this.form2.get("referencias").value,
      coordenadas: this.latlng
    }
    this.datosUsuario.direccion = JSON.stringify(direcciones);
    console.log(this.datosUsuario)
    await this.registroService.guardarPerfil(this.datosUsuario).toPromise().then(
      async (data: any) => {
        console.log(data);
        if (data.log == "Ingresado") {
          let numero = this.datosUsuario.telefono.substring(1, 9);
          await this.registroService.registrarTelefonoFireBase("+593" + numero).then(
            (data: any) => {
              console.log(data);
              alert(data)
            }
          ).catch(
            (err: any) => {
              console.log(err)
            }
          )
          loading.dismiss();
          this.router.navigateByUrl("login");
        }
      }
    ).catch(
      (err: any) => {
        console.log(err)
        if (err.status == 500) {
          if (err.error.error == "ER_DUP_ENTRY") {
            this.alertsService.presentToast("El usuario ya existe.")
          }
        }
        loading.dismiss();
      }
    );
  }

  regresar() {
    if (this.paso_formulario == 1) {
      this.router.navigateByUrl("/login");
      return;
    }
    this.paso_formulario = 1;
  }
  get cedula() {
    return this.form.get("cedula");
  }
  get nombres() {
    return this.form.get("nombres");
  }
  get apellidos() {
    return this.form.get("apellidos");
  }
  get telefono() {
    return this.form.get("telefono");
  }
  get correo() {
    return this.form.get("correo");
  }
  get contrasena() {
    return this.form.get("contrasena");
  }
  get contrasenac() {
    return this.form.get("contrasenac");
  }
  get domicilio() {
    return this.form2.get("domicilio");
  }

  async openModal() {
    this.imagen = false;
    const modal = await this.modalController.create({
      component: MapaMapboxPage,
    });
    modal.onDidDismiss().then((data) => {
      //console.log(data);
      this.posicionmarcador = data.data.split('|');
      //console.log(this.posicionmarcador);
      this.latlng = this.posicionmarcador[1] + ',' + this.posicionmarcador[0];
      //console.log(this.latlng);
      this.url_completa = this.latlng + this.img + this.latlng + this.img_markers;
      //console.log(this.url_completa);
      if (this.url_completa != "") {
        this.imagen = true;
      }
      var gps = this.posicionmarcador[0] + ',' + this.posicionmarcador[1];
      var mode = "retrieveAddresses";
      var maxresults = 1;
      var apikey = 'br0SMC9w-btXVeA6WT-wYrBTIfogArUcMII7vwnj3CQ';
      //console.log(gps);
      var url = "https://reverse.geocoder.ls.hereapi.com/6.2/reversegeocode.json?prox=" + gps + "&mode=" + mode + "&maxresults=" + maxresults + "&apikey=" + apikey;
      //console.log(url);
      this.htttp.get(url).subscribe((results: any) => {
        this.address = results.Response.View[0].Result[0].Location.Address.Label;
        //console.log(results.Response.View[0].Result[0].Location.Address.Label);
      });
      console.log(this.address);
    });
    return await modal.present();

  }


}
