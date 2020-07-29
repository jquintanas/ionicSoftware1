import { AlertsService } from "./../../core/services/alerts/alerts.service";
import { ModalController, NavController } from "@ionic/angular";
import { RecuperarContrasenaPage } from "./../recuperar-contrasena/recuperar-contrasena.page";
import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { AuthService } from "../../core/services/auth/auth.service";
import { AngularFireAuth } from "@angular/fire/auth";
import * as firebase from "firebase";
import { environment } from "src/environments/environment";
import { Facebook, FacebookLoginResponse } from "@ionic-native/facebook/ngx";
import { HttpService } from 'src/app/core/services/http/http.service';

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
    private navController: NavController,
    private router: Router,
    public modalController: ModalController,
    public alertsService: AlertsService,
    private fb: Facebook,
    private afAuth: AngularFireAuth,
    private http: HttpService
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
      var JSON = { "email": this.emailUser, "clave": this.password }
      this.http.getUser(JSON).subscribe(data => {
      if (data != null) {
        console.log(data)
        
        this.afAuth.signInWithEmailAndPassword(this.emailUser, this.password).catch(function(error) {
          var errorCode = error.code;
          var errorMessage = error.message;
          console.log(errorCode, errorMessage)
        });
        this.login()
      } else {
        console.log("Datos invalidos");
      }})
      console.log("formulario inválido", this.loginForm);
      this.onResetForm();
    }
}

  login(){
    this.alertsService.presentLoading("Bienvenido a" + " Omi & Pali");
    this.navController.navigateRoot("/home");
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

  async loginGoogle() {
    this.afAuth.signInWithRedirect(new firebase.auth.GoogleAuthProvider())
      .then((result) => {
        this.navController.navigateRoot("/home");
        this.alertsService.presentLoading("Bienvenido a Omi y Pali");
        console.log(result);
        console.log("Sucess Google");
      }).catch((err) => {
        console.log(err);
      });
  }

  loginFacebook() {
    this.afAuth.signInWithRedirect(new firebase.auth.FacebookAuthProvider());
    this.fb
      .login(["public_profile", "email"])
      .then((res: FacebookLoginResponse) => {
        if (res.status === "connected") {
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
