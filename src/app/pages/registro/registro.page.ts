import { MapaDatosService } from "./../../core/services/mapa-datos/mapa-datos.service";
import { ModalController, Platform, LoadingController } from "@ionic/angular";
import {
  Component,
  OnInit,
  Renderer2,
  ElementRef,
  AfterViewInit,
} from "@angular/core";
import { Router } from "@angular/router";
import {
  FormGroup,
  Validators,
  ValidatorFn,
  AbstractControl,
  FormControl,
} from "@angular/forms";
import { MapaMapboxPage } from "./../mapa-mapbox/mapa-mapbox.page";
import { AlertsService } from "src/app/core/services/alerts/alerts.service";
import { HttpClient } from "@angular/common/http";
import { UsuarioInterface } from "src/app/core/interface/usuarioRegistro";
import { environment } from "src/environments/environment";
import { RegistroService } from "src/app/core/services/registro.service";
import { SeguridadService } from "src/app/core/services/seguridad.service";

@Component({
  selector: "app-registro",
  templateUrl: "./registro.page.html",
  styleUrls: ["./registro.page.scss"],
})
export class RegistroPage implements OnInit {
  imagen = false;
  verubicacion = true;
  form: FormGroup;
  form2: FormGroup;
  goToForm: number;


  urlCompleta: string;
  latlng: string;
  posicionmarcador: string[] = [];
  address: string = "";

  // variables para peticiones
  private datosUsuario: UsuarioInterface;
  constructor(
    public alertsService: AlertsService,
    private router: Router,
    public modalController: ModalController,
    public mapaDatosService: MapaDatosService,
    public renderer: Renderer2,
    public el: ElementRef,
    private platform: Platform,
    private registroService: RegistroService,
    private loadingController: LoadingController,
    private seguridad: SeguridadService
  ) {
    this.goToForm = 1;
    this.mapaDatosService.NuevaUbicacion = true;
    this.platform.backButton.subscribeWithPriority(5, () => {
      console.log("Another handler was called!");
    });
    this.platform.backButton.subscribeWithPriority(10, (processNextHandler) => {
      console.log("Handler was called!");
      processNextHandler();
    });
  }

  ngOnInit() {
    this.buildForm();
    this.buildForm2();
  }

  buildForm() {
    this.form = new FormGroup(
      {
        idField: new FormControl("", [Validators.required, Validators.pattern("[0-9]{10}")]),
        namesField: new FormControl("", [Validators.required, Validators.minLength(4)]),
        lastNamesField: new FormControl("", [Validators.required, Validators.minLength(4)]),
        phoneField: new FormControl("", [Validators.required, Validators.pattern(environment.phonePatter)]),
        emailField: new FormControl("", [Validators.required, Validators.pattern(environment.emailPatter)]),
        passwordField: new FormControl("", [Validators.required, Validators.minLength(8)]),
        passwordCopyField: new FormControl("", [Validators.required, this.passwordValid("passwordField")])
      }
    );
  }

  buildForm2() {
    this.form2 = new FormGroup(
      {
        addressField: new FormControl("", [Validators.required, Validators.minLength(15)]),
        referencesField: new FormControl("", [Validators.required, Validators.minLength(15)])
      }
    );
  }

  public getError(controlName: string, form: string): string {
    if (form == "1") {
      const resp = this.erroresForm1(controlName);
      if (resp) {
        return resp;
      }
    } else if (form == "2") {
      const resp = this.erroresForm2(controlName);
      if (resp) {
        return resp;
      }
    }
    return "";
  }

  private erroresForm1(controlName: string) {
    const control = this.form.get(controlName);
    let field: string;
    if ((control.touched || control.dirty) && control.errors != null) {
      if (control.errors.required != null) {
        switch (controlName) {
          case "idField":
            field = "Cédula";
            break;
          case "namesField":
            field = "Nombres";
            break;
          case "lastNamesField":
            field = "Apellidos";
            break;
          case "phoneField":
            field = "Teléfono";
            break;
          case "emailField":
            field = "Correo Electrónico";
            break;
          case "passwordField":
            field = "Contraseña";
            break;
          case "passwordCopyField":
            field = "Confirmar Contraseña";
            break;
          default:
            field = controlName;
            break;
        }
        return "El campo " + field + " es requerido.";
      }
      if (control.errors.pattern != null) {
        switch (controlName) {
          case "phoneField":
            field = "Teléfono";
            break;
          case "emailField":
            field = "Correo Electrónico";
            break;
          case "idField":
            field = "Cédula";
            break;
        }
        return "Ingrese un " + field + " válido";
      }
      if (control.errors.passwordValid != null) {
        if (controlName == "passwordCopyField") {
          return "La contraseña no coincide";
        }
      }
      if (control.errors.minlength != null) {
        return "Se requieren " + control.errors.minlength.requiredLength + " caracteres";
      }
    }
  }

  private erroresForm2(controlName: string) {
    let field: string;
    const control = this.form2.get(controlName);
    if ((control.touched || control.dirty) && control.errors != null) {
      if (control.errors.required != null) {
        if (controlName == "addressField") {
          field = "Domicilio";
        } else if (controlName == "referencesField") {
          field = "Referencias";
        }
        return "El campo " + field + " es requerido.";
      }
      if (control.errors.minlength != null) {
        return "Se requieren " + control.errors.minlength.requiredLength + " caracteres";
      }
    }
  }

  save() {
    const clave = this.seguridad.generarHashClave(
      this.form.get("passwordField").value
    );
    this.datosUsuario = {
      cedula: this.form.get("idField").value,
      nombre: this.form.get("namesField").value,
      apellido: this.form.get("lastNamesField").value,
      telefono: this.form.get("phoneField").value,
      email: this.form.get("emailField").value,
      contrasenia: clave,
      rol: environment.idRol,
    };
    this.goToForm = 2;
  }

  passwordValid(fieldName): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
      const input = control.value;
      const isValid = control.root.value[fieldName] == input;
      if (!isValid) {
        return { passwordValid: { isValid } };
      } else {
        return null;
      }
    };
  }

  salirRegistro() {
    this.router.navigateByUrl("login");
  }

  async save2() {
    const loading = await this.loadingController.create({
      message: "Guardando...",
    });
    await loading.present();
    const direcciones = {
      direccion: this.form2.get("addressField").value,
      referencia: this.form2.get("referencesField").value,
      coordenadas: this.latlng,
    };
    this.datosUsuario.direccion = JSON.stringify(direcciones);
    console.log(this.datosUsuario);
    await this.registroService
      .guardarPerfil(this.datosUsuario)
      .toPromise()
      .then(async (data: any) => {
        console.log(data);
        if (data.log == "Ingresado") {
          const numero = this.datosUsuario.telefono.substring(1, 9);
          const datos = {
            email: this.form.get("emailField").value,
            pass: this.form.get("passwordField").value
          };
          await this.registroService.registrar(datos).then(
            (dt: any) => {
              console.log(data);
            }
          ).catch(
            err => { console.log(err); }
          );
          loading.dismiss();
          //this.router.navigateByUrl("login");
        }
      })
      .catch((err: any) => {
        console.log(err);
        if (err.status == 500) {
          if (err.error.error == "ER_DUP_ENTRY") {
            this.alertsService.presentToast("El usuario ya existe.");
          }
        }
        loading.dismiss();
      });
  }

  return() {
    if (this.goToForm == 1) {
      this.router.navigateByUrl("/login");
      return;
    }
    this.goToForm = 1;
  }

  async openModal() {
    this.imagen = false;
    const modal = await this.modalController.create({
      component: MapaMapboxPage,
    });
    modal.onDidDismiss().then((data) => {
      this.posicionmarcador = data.data.split("|");
      this.latlng = this.posicionmarcador[1] + "," + this.posicionmarcador[0];
      this.urlCompleta =
        this.latlng + environment.imgsecondpart + this.latlng + environment.img_markers;
      if (this.urlCompleta != "") {
        this.imagen = true;
      }

    });
    return await modal.present();
  }
}
