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
    this.getAdress(this.userinfo.direccion);
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

  getAdress(address: any) {
    const obj = JSON.parse(address);
    this.direccion = obj.direccion;
    this.referencia = obj.referencia;
    this.coordenadas = obj.coordenadas;
    console.log(this.userinfo.direccion);
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
    const token = await this.authService.token.token;
    console.log(token);
    const headers = {
      'Content-Type': 'application/json',
      // tslint:disable-next-line: object-literal-key-quotes
      'Authorization': 'Bearer ' + token
    };
    console.log(headers);
    this.userinfo.usuario = this.userDataForm.get("namesField").value;
    this.userinfo.telefono = this.userDataForm.get("phoneField").value;
    this.userinfo.direccion = this.userDataForm.get("directionField").value;
    this.datosUsuario = {
      cedula: this.userinfo.cedula,
      nombre: this.userinfo.nombre,
      apellido: this.userinfo.apellido,
      telefono: this.userinfo.telefono,
      email: this.userinfo.email,
      direccion: this.userinfo.direccion,
      contrasenia: "12345678",
      rol: 3
    };
    console.log(this.datosUsuario);
    this.userinfo.setUserInfo(this.datosUsuario, headers).toPromise().then(data => {
      console.log("ngresado correctamente");
    }).catch ((err) => {
      console.log(err);
    })
    ;
  }

  onFileSelected(event) {
    // this.spinner.show();
    this.selectedFile = event.target.files[0];
    this.uploadFile(this.selectedFile);
    // this.spinner.hide();
  }

  uploadFile(file: any) {
    for (let i = 0; i < file.length; i++) {
      const mimeType = file[i].type;
      if (mimeType.match(/image\/*/) == null) {
        return;
      }

      this.allfiles.push(file[i]);
      console.log(file[i]);
      const reader = new FileReader();
      reader.onload = (fileData) => {
        this.previewUrl = reader.result;
        this.Urls.push(this.previewUrl);
      };
      reader.readAsDataURL(file[i]);
    }
  }

  uploadPhoto() {
    const usuario: Usuario = {
      imagen: this.previewUrl,
    };

    this.userinfo.updatePhotoUser(usuario);
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
