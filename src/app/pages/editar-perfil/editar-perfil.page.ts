import { Component, OnInit, Renderer2, ElementRef } from "@angular/core";
import { ModalController } from "@ionic/angular";
import { MapaMapboxPage } from "../mapa-mapbox/mapa-mapbox.page";
import { FormBuilder, Validators, FormGroup } from "@angular/forms";
import { environment } from "src/environments/environment";
import { AlertsService } from 'src/app/core/services/alerts/alerts.service';
import { UserInfoService } from 'src/app/core/services/userInfo/user-info.service';
import { UpdateInterface } from "src/app/core/interface/usuarioUpdate";
import { HttpClient } from '@angular/common/http';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { Usuario } from 'src/app/core/interface/modelNOSQL/usuario';
import { AuthService } from 'src/app/core/services/auth/auth.service';

@Component({
  selector: "app-editar-perfil",
  templateUrl: "./editar-perfil.page.html",
  styleUrls: ["./editar-perfil.page.scss"],
})
export class EditarPerfilPage implements OnInit {
  base64: any;
  selectedFile: File = null;
  userDataForm: FormGroup;
  id: string;
  private datosUsuario: UpdateInterface;
  Urls: any = [];
  allfiles: any = [];
  previewUrl: any = null;
  direccion: string;
  referencia: string;
  coordenadas: string;
  private datosRespaldo: any;
  constructor(
    private formBuilder: FormBuilder,
    public modalController: ModalController,
    public renderer: Renderer2,
    public el: ElementRef,
    private alertService: AlertsService,
    private userinfo: UserInfoService,
    private http: HttpClient,
    private camera: Camera,
    private authService: AuthService
  ) {
  }

  public user: string;

  ngOnInit() {
    this.getAddress(this.userinfo.direccion);
    this.buildForm();
  }


  public submit() {
    console.log(this.userDataForm.value);
  }

  async openModal() {
    const modal = await this.modalController.create({
      component: MapaMapboxPage,
    });
    return await modal.present();
  }

  public MessageValidator(error) {
    if (error) {
      return "campo requerido";
    }

    if (!error) {
      return "campo inválido";
    }

    return " ";
  }

  getAddress(address: any) {
    const obj = JSON.parse(address);
    this.direccion = obj.direccion;
    this.referencia = obj.referencia;
    this.coordenadas = obj.coordenadas;
  }

  buildForm() {
    this.userDataForm = this.formBuilder.group({
      namesField: [this.userinfo.usuario, [Validators.required, Validators.maxLength(50)]],
      directionField: [this.direccion, [Validators.required, Validators.minLength(10)]],
      emailField: [this.userinfo.email, [Validators.required, Validators.pattern(environment.emailPatter)]],
      phoneField: [this.userinfo.telefono, [Validators.required, Validators.maxLength(10), Validators.minLength(10),
      Validators.pattern(environment.phonePatter)]],
      referencia: [this.referencia, [Validators.required]]
    });
    this.datosRespaldo = this.userDataForm.value;
  }


  public getError(controlName: string): string {
    let field: string;
    // console.log(this.form.controls);
    const control = this.userDataForm.get(controlName);
    if ((control.touched || control.dirty) && control.errors != null) {
      if (control.errors.required != null) {
        field = controlName;
        if (controlName === "namesField") {
          field = "Nombres";
        } else if (controlName === "phoneField") {
          field = "Teléfono";
        } else if (controlName === "emailField") {
          field = "Correo Electrónico";
        } else if (controlName === "directionField") {
          field = "Dirección";
        }
        return "El campo " + field + " es requerido.";
      }
      if (control.errors.pattern != null) {
        if (controlName === "phoneField") {
          field = "Teléfono";
        } else if (controlName === "emailField") {
          field = "Correo Electrónico";
        }
        return "Ingrese un " + field + " válido";
      }
    }
    return "";
  }

  async guardarCambios() {
    this.userinfo.usuario = this.userDataForm.get("namesField").value;
    this.userinfo.telefono = this.userDataForm.get("phoneField").value;
    this.userinfo.direccion = this.setAddress(this.userDataForm.get("directionField").value,
    this.userDataForm.get("referencia").value);
    const nombre = (this.userinfo.usuario).split(' ');
    this.datosUsuario = {
      cedula: this.userinfo.cedula,
      nombre: nombre[0],
      apellido: nombre[1],
      telefono: this.userinfo.telefono,
      email: this.userinfo.email,
      direccion: "{\"direccion\":\"ssssssssssssssss\",\"referencia\":\"ssssssssssssssss\",\"coordenadas\":\"-79.9336,-2.0649\"}",
      contrasenia: "12345678",
      rol: 3
    };
    this.userinfo.setUserInfo(this.datosUsuario).toPromise().then(data => {
      console.log("ingresado correctamente");
    }).catch ((err) => {
      console.log(err);
    });
  }

  setAddress(address: string, reference: string) {
    const direccion = {
      // tslint:disable-next-line: object-literal-key-quotes
      "direccion" : address,
      // tslint:disable-next-line: object-literal-key-quotes
      "referencia": reference,
      // tslint:disable-next-line: object-literal-key-quotes
      "coordenadas": this.coordenadas
    };
    return direccion;
    console.log(direccion);
  }

  validarCambiosDatos() {
    return JSON.stringify(this.datosRespaldo) !== JSON.stringify(this.userDataForm.value);
  }

  cargarFotoGaleria() {
    const options: CameraOptions = {
      quality: 60,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      targetWidth: 500,
      saveToPhotoAlbum: false,
      correctOrientation: true
    };

    this.camera.getPicture(options).then((imageData) => {
      this.base64 = 'data:image/jpeg;base64,' + imageData;
    }, (err) => {
      // Handle error
    });
  }
}
