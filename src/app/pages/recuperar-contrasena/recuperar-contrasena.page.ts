import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ModalController } from "@ionic/angular";
import { AlertsService } from "src/app/core/services/alerts/alerts.service";
import { environment } from "./../../../environments/environment";
import { HttpClient } from '@angular/common/http';
import { AuthService } from 'src/app/core/services/auth/auth.service';

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
    public alertsService: AlertsService,
    private authService: AuthService,
    private http: HttpClient
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
      this.http.get(environment.rutas.getUser).toPromise().then( (dt) => {
        for (let i = 0; i < Object.keys(dt).length; i++) {
          console.log(value.emailField);
          if (dt[i].email == value.emailField) {
            this.authService.resetPasswordEmail(value.emailField);
          }
        }
      });
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
