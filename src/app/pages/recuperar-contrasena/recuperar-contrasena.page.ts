import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ModalController } from "@ionic/angular";
import { AlertsService } from "src/app/core/services/alerts/alerts.service";
import { environment } from "./../../../environments/environment";

@Component({
  selector: "app-recuperar-contrasena",
  templateUrl: "./recuperar-contrasena.page.html",
  styleUrls: ["./recuperar-contrasena.page.scss"],
})
export class RecuperarContrasenaPage implements OnInit {
  recoveryForm: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private modalController: ModalController,
    public alertsService: AlertsService
  ) {
    this.buildForm();
  }

  ngOnInit() { }

  buildForm() {
    this.recoveryForm = this.formBuilder.group({
      emailField: [
        "",
        [Validators.required, Validators.pattern(environment.emailPatter)],
      ],
    });
  }

  dismissLogin() {
    this.modalController.dismiss();
  }
  save() {
    if (this.recoveryForm.valid) {
      const value = this.recoveryForm.value;
      console.log(value);
      console.log(this.recoveryForm);
      this.alertsService.presentLoading("Enviando Mensaje");
    } else {
      console.log("formulario inválido", this.recoveryForm);
      this.onResetForm();
    }
  }

  onResetForm() {
    this.recoveryForm.reset();
  }

  public getError(controlName: string): string {
    const control = this.recoveryForm.get(controlName);
    let field;
    if ((control.touched || control.dirty) && control.errors != null) {
      if (control.errors.required != null) {
        field = controlName;
        if (controlName == "emailField") {
          field = "Correo";
        }
        return "El campo " + field + " es requerido.";
      }
      if (controlName == "emailField" && control.errors.pattern != null) {
        return "Ingrese un correo electrónico válido";
      }
    }
    return "";
  }
}
