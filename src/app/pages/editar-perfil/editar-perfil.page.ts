import { Component, OnInit, Renderer2, ElementRef } from "@angular/core";
import { ModalController } from "@ionic/angular";
import { MapaMapboxPage } from "../mapa-mapbox/mapa-mapbox.page";
import { FormBuilder, Validators, FormGroup } from "@angular/forms";
import { environment } from "src/environments/environment";
import { AlertsService } from 'src/app/core/services/alerts/alerts.service';
import { UserInfoService } from 'src/app/core/services/userInfo/user-info.service';
import { UpdateInterface } from "src/app/core/interface/usuarioUpdate";

@Component({
  selector: "app-editar-perfil",
  templateUrl: "./editar-perfil.page.html",
  styleUrls: ["./editar-perfil.page.scss"],
})
export class EditarPerfilPage implements OnInit {
  userDataForm: FormGroup;
  id: string;
  userName: string = "";
  phoneNumber: string = "";
  emailUser: string = "";
  addressUser: string = "";
  reference: string = "r";
  private datosUsuario: UpdateInterface;

  constructor(
    private formBuilder: FormBuilder,
    public modalController: ModalController,
    public renderer: Renderer2,
    public el: ElementRef,
    private alertService: AlertsService,
    private userinfo: UserInfoService
  ) {
    this.buildForm();
  }

  public user: string;

  ngOnInit() {
    this.setInfo();
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

  buildForm() {
    this.userDataForm = this.formBuilder.group({
      namesField: ["", [Validators.required, Validators.maxLength(50)]],
      directionField: ["", [Validators.required, Validators.minLength(10)]],
      emailField: ["", [Validators.required, Validators.pattern(environment.emailPatter)]],
      phoneField: ["", [Validators.required, Validators.maxLength(10), Validators.minLength(10),
      Validators.pattern(environment.phonePatter)]],
    });
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

  setInfo() {
      this.userName = this.userinfo.usuario;
      this.phoneNumber = this.userinfo.telefono;
      this.emailUser = this.userinfo.email;
      this.addressUser = this.userinfo.direccion;
  }

  async guardarCambios() {
    this.userinfo.usuario = this.userName;
    this.userinfo.telefono = this.phoneNumber;
    this.userinfo.email = this.emailUser;
    this.userinfo.direccion = this.addressUser;
    this.datosUsuario.nombre = this.userName;
    this.datosUsuario.telefono = this.phoneNumber;
    this.datosUsuario.email = this.emailUser;
    this.datosUsuario.direccion = this.addressUser;
    await this.userinfo.setUserInfo(this.datosUsuario);
    this.alertService.alert("ACTUALIZACION", "Datos actualizados correctamente");
  }
}
