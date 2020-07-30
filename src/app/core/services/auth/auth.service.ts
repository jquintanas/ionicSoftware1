import { Injectable } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/auth";
import * as firebase from 'firebase/app';
import { AlertsService } from '../alerts/alerts.service';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook/ngx';
import { Router } from "@angular/router";
import { Storage } from '@ionic/storage';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly JWT_TOKEN = 'JWT_TOKEN';
  private readonly REFRESH_TOKEN = 'REFRESH_TOKEN';

  constructor(
    private AFauth: AngularFireAuth,
    public alertsService: AlertsService,
    private fb: Facebook,
    private httpClient: HttpClient,
    private router: Router,
    private storage: Storage
  ) { }

  login(email, password) {
    // tslint:disable-next-line: object-literal-key-quotes
    const usuario = { "email": email, "clave": password };
    this.httpClient.post(environment.urlLogin, usuario)
    .subscribe(data => {
      if (data != null) {
        this.doLoginUser(data);
        // tslint:disable-next-line: only-arrow-functions
        this.AFauth.signInWithEmailAndPassword(email, password).catch(function(error) {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorCode, errorMessage);
        });
        this.alertsService.presentLoading("Bienvenido a" + " Omi & Pali");
        this.router.navigateByUrl("home");
      } else {
        console.log("Datos invalidos");
      }
    });
  }

  private doLoginUser(data) {
    const emailUser = data.data.email;
    const user = data.data.nombre.concat(" ", data.data.apellido);
    const phone = data.data.telefono;
    const address = data.data.direccion;
    this.storage.set("email", emailUser);
    this.storage.set("user", user);
    this.storage.set("phone", phone);
    this.storage.set("address", address);
  }

  async loginGoogle() {
    const provider = new firebase.auth.GoogleAuthProvider();
    this.AFauth.signInWithPopup(provider)
      .then((result) => {
        this.router.navigateByUrl("home");
        this.alertsService.presentLoading("Bienvenido a Omi y Pali");
        console.log(result);
        console.log("Sucess Google");
      }).catch((err) => {
        console.log(err);
      });
  }

  loginFacebook() {
    this.AFauth.signInWithRedirect(new firebase.auth.FacebookAuthProvider());
    this.fb
      .login(["public_profile", "email"])
      .then((res: FacebookLoginResponse) => {
        if (res.status === "connected") {
          console.log(res);
        } else {
          alert("Login Failed");
        }
        console.log("Logged into Facebook!", res);
      })
      .catch((e) => console.log("Error logging into Facebook", e));
  }

  logout() {
    // tslint:disable-next-line: only-arrow-functions
    firebase.auth().signOut().then(function() {
    // tslint:disable-next-line: only-arrow-functions
    }).catch(function(error) {
      console.log(error);
    });
    this.router.navigateByUrl("login");
  }

  private storeToken(jwt: string) {
    this.storage.set(this.JWT_TOKEN, jwt);
  }

  getToken() {
    return this.storage.get(this.JWT_TOKEN);
  }

  private getRefreshToken() {
    return this.storage.get(this.REFRESH_TOKEN);
  }
}
