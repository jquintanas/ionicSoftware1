import { AlertsService } from "./../../core/services/alerts/alerts.service";
import { ModalController, NavController, LoadingController } from "@ionic/angular";
import { RecuperarContrasenaPage } from "./../recuperar-contrasena/recuperar-contrasena.page";
import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { environment } from "src/environments/environment";
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { UserInfoService } from 'src/app/core/services/userInfo/user-info.service';

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
    private authService: AuthService,
    private loadingController: LoadingController,
    private navController: NavController,
    private userInfo: UserInfoService
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
          Validators.pattern(environment.emailPatter)
        ],
      ],
      passwordField: ["", [Validators.required, Validators.minLength(8)]],
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

  async save() {
    const loading = await this.loadingController.create({ message: "Cargando..." });
    await loading.present();
    const value = this.loginForm.value;
    this.emailUser = value.phoneField;
    this.password = value.passwordField;
    await this.authService.loginToFirebase(this.emailUser, this.password).then(
      async (data: any) => {
        this.authService.idUserFirebase = data.id;
        if (data) {
          await this.authService.loginToApi(this.emailUser, this.password).toPromise().then(
            (dt: any) => {
              console.log(dt);

              this.authService.dataUser = dt.data;
              this.authService.token = {
                refreshToken: dt.refreshToken,
                token: dt.token
              };
              this.authService.isAuth = true;
              this.userInfo.email = dt.data.email;
              this.userInfo.cedula = dt.data.cedula;
              this.userInfo.nombre = dt.data.nombre;
              this.userInfo.apellido = dt.data.apellido;
              this.userInfo.usuario = dt.data.nombre + " " + dt.data.apellido;
              this.userInfo.telefono = dt.data.telefono;
              this.userInfo.direccion = dt.data.direccion;
              this.userInfo.contrasenia = this.password;
              loading.dismiss();
              this.navController.navigateRoot("home");
            }
          ).catch(
            err => {
              console.log(err);
              this.authService.logout();
              loading.dismiss();
              this.alertsService.alert("ERROR", "Correo y/o clave incorrecta");
            }
          );
        }
      }
    ).catch(
      err => {
        console.log(err);
        loading.dismiss();
        this.alertsService.alert("ERROR", "Correo y/o clave incorrecta");
      }
    );
  }

  loginGoogle() {
    this.authService.loginGoogle();
  }

  loginFacebook() {
    this.authService.loginFacebook();
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
      if (controlName == "passwordField" && control.errors.minlength != null) {
        return "Clave muy corta";
      }
    }
    return "";
  }
}
