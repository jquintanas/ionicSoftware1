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
  FormBuilder,
  FormGroup,
  Validators,
  ValidatorFn,
  AbstractControl,
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
    private formBuilder: FormBuilder,
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
    this.buildForm();
    this.buildForm2();
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

  ngOnInit() { }

  buildForm() {
    this.form = this.formBuilder.group({
      idField: [
        "",
        [
          Validators.required,
          Validators.minLength(10)
        ],
      ],
      namesField: ["", [Validators.required, Validators.minLength(4)]],
      lastNamesField: ["", [Validators.required, Validators.minLength(4)]],
      phoneField: [
        "",
        [
          Validators.required,
          Validators.minLength(10),
          Validators.pattern(environment.phonePatter),
        ],
      ],
      emailField: [
        "",
        [Validators.required, Validators.pattern(environment.emailPatter)],
      ],
      passwordField: ["", [Validators.required, Validators.minLength(8)]],
      passwordCopyField: [
        "",
        [Validators.required, this.passwordValid("passwordField")],
      ],
    });
  }

  buildForm2() {
    this.form2 = this.formBuilder.group({
      addressField: ["", [Validators.required, Validators.minLength(15)]],
      referencesField: ["", [Validators.required, Validators.minLength(15)]],
    });
  }

  public getError(controlName: string, form: string): string {
    let field: string;
    if (form == "1") {
      // console.log(this.form.controls);
      const control = this.form.get(controlName);
      if ((control.touched || control.dirty) && control.errors != null) {
        if (control.errors.required != null) {
          field = controlName;
          if (controlName == "idField") {
            field = "Cédula";
          } else if (controlName == "namesField") {
            field = "Nombres";
            // console.log(control.errors.minlenght != null,control.errors.maxLength != null, control.errors);
          } else if (controlName == "lastNamesField") {
            field = "Apellidos";
          } else if (controlName == "phoneField") {
            field = "Teléfono";
          } else if (controlName == "emailField") {
            field = "Correo Electrónico";
          } else if (controlName == "passwordField") {
            field = "Contraseña";
          } else if (controlName == "passwordCopyField") {
            field = "Confirmar Contraseña";
          }
          return "El campo " + field + " es requerido.";
        }
        if (control.errors.pattern != null) {
          if (controlName == "phoneField") {
            field = "Teléfono";
          } else if (controlName == "emailField") {
            field = "Correo Electrónico";
          }
          return "Ingrese un " + field + " válido";
        }
        if (control.errors.passwordValid != null) {
          if (controlName == "passwordCopyField") {
            return "La contraseña no coincide";
          }
        }
        /*if(controlName == "idField" && control.errors.minLength != null){
          console.log("entre aqui min length");
        }*/
      }
    } else if (form == "2") {
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
      }
    }
    return "";
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
          await this.registroService
            .registrarTelefonoFireBase("+593" + numero)
            // tslint:disable-next-line: no-shadowed-variable
            .then((data: any) => {
              console.log(data);
              alert(data);
            })
            .catch((err: any) => {
              console.log(err);
            });
          loading.dismiss();
          this.router.navigateByUrl("login");
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
