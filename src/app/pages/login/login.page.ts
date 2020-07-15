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
//import { usuarioInterface } from "src/app/interface/usuarioRegistro";
import { HttpService } from 'src/app/services/http/http.service'

@Component({
  selector: "app-login",
  templateUrl: "./login.page.html",
  styleUrls: ["./login.page.scss"],
})
export class LoginPage implements OnInit {
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
    private afAuth: AngularFireAuth,
    private http: HttpService
  ){
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
      this.phoneNumber = value.phoneField;
      this.password = value.passwordField;
      this.alertsService.presentLoading("Bienvenido a" + " Omi & Pali");
      this.navController.navigateRoot("/home");

      var data = JSON.stringify({id: this.phoneNumber, clave: this.password})
     
      console.log(data)
      this.http.getUser(data)
      .subscribe(data => {
        console.log(data);
      });
      
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
  /*
  
  private userData: usuarioInterface = {
    telefono: "",
    contrasenia: ""
  };

  onSubmitLogin() {
    this.auth.login(this.userData.telefono, this.userData.contrasenia)
    .subscribe(data => {
      console.log(data);
    },
    error => console.log(error)
    );

  
  }
  onLogout(){
    this.auth.logout();
  }*/

  async loginGoogle() {
    this.afAuth.signInWithRedirect(new firebase.auth.GoogleAuthProvider())
    .then(function(result){
      this.navController.navigateRoot("/home");
      this.alertsService.presentLoading("Bienvenido a Omi y Pali");    
      console.log(result)
      console.log("Sucess Google")
    }).catch(function(err){
      console.log(err)
    })}    

  loginFacebook() {
    this.afAuth.signInWithRedirect(new firebase.auth.FacebookAuthProvider())
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
