import { AlertsService } from "./../../core/services/alerts/alerts.service";
import { ModalController, NavController } from "@ionic/angular";
import { RecuperarContrasenaPage } from "./../recuperar-contrasena/recuperar-contrasena.page";
import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { environment } from "src/environments/environment";
import { AuthService } from 'src/app/core/services/auth/auth.service';

@Component({
  selector: "app-login",
  templateUrl: "./login.page.html",
  styleUrls: ["./login.page.scss"],
})
export class LoginPage implements OnInit {
  isSubmitted = false;
  currentPopover = null;
  loginForm: FormGroup;
  emailUser: string;
  password: string;
  user: any = {};
  showPassword = false;
  passwordToogleIcon = "eye-sharp";

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    public modalController: ModalController,
    public alertsService: AlertsService,
    private authService: AuthService
  ) {
    this.buildForm();
  }

  ngOnInit() { }

  buildForm() {
    this.loginForm = this.formBuilder.group({
      phoneField: [
        "",
        [
          Validators.required,
          Validators.maxLength(50),
          Validators.minLength(10),
          Validators.pattern(environment.emailPatter),
        ],
      ],
      passwordField: ["", [Validators.required, Validators.min(8)]],
    });
  }

  toogglePassword(): void {
    this.showPassword = !this.showPassword;
    if (this.passwordToogleIcon === "eye-sharp") {
      this.passwordToogleIcon = "eye-off-sharp";
    } else {
      this.passwordToogleIcon = "eye-sharp";
    }
  }

  save() {
    if (this.loginForm.valid) {
      const value = this.loginForm.value;
      this.emailUser = value.phoneField;
      this.password = value.passwordField;
      this.authService.login(this.emailUser, this.password)
    } else {
      console.log("formulario inválido", this.loginForm);
      this.onResetForm();
    }
}

  onResetForm() {
    this.loginForm.reset();
  }

  openRegister() {
    this.router.navigateByUrl("registro");
  }

  openRecoveryPassword() {
    this.router.navigateByUrl("recuperar-contrasena");
  }

  async openPassword() {
    const modal = await this.modalController.create({
      component: RecuperarContrasenaPage,
    });
    return await modal.present();
  }

  public getError(controlName: string): string {
    const control = this.loginForm.get(controlName);
    let field;
    if ((control.touched || control.dirty) && control.errors != null) {
      if (control.errors.required != null) {
        field = controlName;
        if (controlName === "phoneField") {
          field = "correo electrónico";
        } else if (controlName === "passwordField") {
          field = "contraseña";
        }
        return "El campo " + field + " es requerido.";
      }
      if (controlName === "phoneField" && control.errors.pattern != null) {
        return "Ingrese un correo electrónico válido";
      }
    }
    return "";
  }
}
