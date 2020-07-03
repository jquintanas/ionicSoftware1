import { AlertsService } from "./../../services/alerts/alerts.service";
import { ModalController, NavController } from "@ionic/angular";
import { RecuperarContrasenaPage } from "./../recuperar-contrasena/recuperar-contrasena.page";
import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { AuthService } from "../../services/auth/auth.service";
import { AngularFireAuth } from "@angular/fire/auth";
import * as firebase from "firebase";
import { environment } from "src/environments/environment";
import { Facebook, FacebookLoginResponse } from "@ionic-native/facebook/ngx";
import { usuarioInterface } from "src/app/interface/usuarioRegistro";

@Component({
  selector: "app-login",
  templateUrl: "./login.page.html",
  styleUrls: ["./login.page.scss"],
})
export class LoginPage implements OnInit {
  name: string;
  email: string;
  isSubmitted = false;
  currentPopover = null;
  loginForm: FormGroup;
  phoneNumber: string;
  password: string;
  user: any = {};
  showPassword = false;
  passwordToogleIcon = "eye-sharp";

  constructor(
    private formBuilder: FormBuilder,
    private navController: NavController,
    private router: Router,
    public modalController: ModalController,
    public alertsService: AlertsService,
    private auth: AuthService,
    private fb: Facebook,
    private afAuth: AngularFireAuth
  ) {
    this.buildForm();
  }

  ngOnInit() {}

  buildForm() {
    this.loginForm = this.formBuilder.group({
      phoneField: [
        "",
        [
          Validators.required,
          Validators.maxLength(10),
          Validators.minLength(10),
          Validators.pattern(environment.phonePatter),
        ],
      ],
      passwordField: ["", [Validators.required, Validators.min(8)]],
    });
  }

  toogglePassword(): void {
    this.showPassword = !this.showPassword;
    if (this.passwordToogleIcon == "eye-sharp") {
      this.passwordToogleIcon = "eye-off-sharp";
    } else {
      this.passwordToogleIcon = "eye-sharp";
    }
  }

  save() {
    if (this.loginForm.valid) {
      const value = this.loginForm.value;
      this.alertsService.presentLoading("Bienvenido" + " Danny");
      this.navController.navigateRoot("/home");
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
    let control = this.loginForm.get(controlName);
    let field;
    if ((control.touched || control.dirty) && control.errors != null) {
      if (control.errors.required != null) {
        field = controlName;
        if (controlName == "phoneField") {
          field = "Teléfono";
        } else if (controlName == "passwordField") {
          field = "Contraseña";
        }
        return "El campo " + field + " es requerido.";
      }
      if (controlName == "phoneField" && control.errors.pattern != null) {
        return "Ingrese un teléfono válido";
      }
    }
    return "";
  }

  onSubmitLogin() {
    this.auth.login(this.phoneNumber, this.password);
  }

  /*
    Fecha de Creación: 22/06/2020
    Fecha de Modificación: 22/06/2020
    Usuario de creación: Fman
    Usuario de Modificación: Fman
    Iniciar sesion con google
  */
  async loginGoogle() {
    /* const res = await this.afAuth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
    const user = res.user;
    console.log(user);
    this.picture = user.photoURL;
    this.name = user.displayName;
    this.email = user.email;*/

    this.auth
      .loginWithGoogle()
      .then(() => {
        this.navController.navigateRoot("/home");
        this.alertsService.presentLoading("Bienvenido a Omi y Pali");
      })
      .catch((err) => {
        alert("Ocurrio un error, contactar soporte");
      });
  }

  /*
    Fecha de Creación: 22/06/2020
    Fecha de Modificación: 22/06/2020
    Usuario de creación: Fman
    Usuario de Modificación: Fman
    Iniciar sesion con Facebook
  */
  loginFacebook() {
    this.fb
      .login(["public_profile", "email"])
      .then((res: FacebookLoginResponse) => {
        if (res.status == "connected") {
          this.user.img =
            "https://graph.facebook.com/" +
            res.authResponse.userID +
            "/picture?type=square";
        } else {
          alert("Login Failed");
        }
        console.log("Logged into Facebook!", res);
      })
      .catch((e) => console.log("Error logging into Facebook", e));
  }
}
