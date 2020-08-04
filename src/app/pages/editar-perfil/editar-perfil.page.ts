import { Component, OnInit, Renderer2, ElementRef } from "@angular/core";
import { ModalController } from "@ionic/angular";
import { MapaMapboxPage } from "../mapa-mapbox/mapa-mapbox.page";
import { FormBuilder, Validators, FormGroup } from "@angular/forms";
import { environment } from "src/environments/environment";
import { Storage } from '@ionic/storage';
import { HttpClient } from '@angular/common/http';
import { AlertsService } from 'src/app/core/services/alerts/alerts.service';

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

  constructor(
    private formBuilder: FormBuilder,
    public modalController: ModalController,
    private storage: Storage,
    public renderer: Renderer2,
    public el: ElementRef,
    private httpClient: HttpClient,
    private alertService: AlertsService,
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
    this.storage.get('user').then((data) => {
      this.userName = data;
    });
    this.storage.get('phone').then((data) => {
      this.phoneNumber = data;
    });
    this.storage.get('email').then((data) => {
      this.emailUser = data;
    });
    this.storage.get('address').then((data) => {
      this.addressUser = data;
    });
  }


getName() {
  this.storage.get("user");
}
/*
getUserInfo() {
  let cedula = this.storage.get("id");
  this.id = String(cedula);
  this.httpClient.get(environment.urlGetUser.id);
}*/

  guardarCambios() {
    this.storage.set("user", this.userName);
    this.storage.set("phone", this.phoneNumber);
    this.storage.set("email", this.emailUser);
    this.storage.set("address", this.addressUser);
    this.alertService.alert("ACTUALIZACION", "Datos actualizados correctamente");
  }
}
