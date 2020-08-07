import { Injectable } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/auth";
import * as firebase from 'firebase/app';
import { AlertsService } from '../alerts/alerts.service';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook/ngx';
import { Router } from "@angular/router";
import { Storage } from '@ionic/storage';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Token } from 'src/app/core/interface/token';
import { tap } from 'rxjs/operators';
import { LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly JWT_TOKEN = 'JWT_TOKEN';
  private readonly REFRESH_TOKEN = 'REFRESH_TOKEN';
  private loggedUser: string;
  token: string;

  constructor(
    private AFauth: AngularFireAuth,
    public alertsService: AlertsService,
    private fb: Facebook,
    private httpClient: HttpClient,
    private router: Router,
    private storage: Storage,
    public loadingController: LoadingController
  ) { }

   async login(email, password) {
    const loading = await this.loadingController.create({ message: "Bienvenido a Omi & Pali" });
    await loading.present();
    // tslint:disable-next-line: object-literal-key-quotes
    const usuario = { "email": email, "clave": password };
    this.httpClient.post(environment.rutas.urlLogin, usuario)
    .subscribe(data => {
      if (data != null) {
        this.doLoginUser(data);
        // tslint:disable-next-line: only-arrow-functions
        this.AFauth.signInWithEmailAndPassword(email, password).catch(function(error) {
          const errorCode = error.code;
          const errorMessage = error.message;
          this.alertsService.alert("ERROR", "Correo electrónico y/o contraseña incorrectos");
          console.log(errorCode, errorMessage);
        });
        this.router.navigateByUrl("home");
        loading.dismiss();
      } else {
        console.log("Datos invalidos");
        this.alertsService.alert("ERROR", "Correo electrónico y/o contraseña incorrectos");
      }
    });
  }

  refreshToken() {
    return this.httpClient.post<any>(environment.rutas.urlToken,
      {
        // tslint:disable-next-line: object-literal-key-quotes
        'email': this.loggedUser,
        // tslint:disable-next-line: object-literal-key-quotes
        'refreshToken': this.getRefreshToken()
      })
    .pipe(
      tap(data => {
      this.storeJwtToken(data.token);
    }));
  }

  async doLoginUser(data) {
    this.loggedUser = data.data.email;
    const user = data.data.nombre.concat(" ", data.data.apellido);
    const phone = data.data.telefono;
    const address = data.data.direccion;
    const id = data.data.cedula;
    this.storage.set("email", this.loggedUser);
    this.storage.set("user", user);
    this.storage.set("phone", phone);
    this.storage.set("address", address);
    this.storage.set("id", id);
    const tokens: Token =  {token : data.token, refreshToken: data.refreshToken};
    this.storeTokens(tokens);
    this.getJWTToken();
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
    this.AFauth.signOut().then(
      data => {console.log(data); }
    ).catch(
      err => {console.log(err); }
    );
    // firebase.auth().signOut().then(function() {
    // // tslint:disable-next-line: only-arrow-functions
    // }).catch(function(error) {
    //   console.log(error);
    // });
    this.doLogoutUser();
    this.router.navigateByUrl("login");
  }

  private storeTokens(tokens: Token) {
    this.storage.set(this.JWT_TOKEN, tokens.token);
    this.storage.set(this.REFRESH_TOKEN, tokens.refreshToken);
  }

  isLoggedIn() {
    return !!this.getToken();
  }

   getToken() {
    return  this.storage.get(this.JWT_TOKEN);
  }

  async getToken2(): Promise<any> {
    return  await this.storage.get(this.JWT_TOKEN).then(data =>{
      return data;
    });
  }
  getJWTToken() {
    this.storage.get('JWT_TOKEN').then((result) => {
      console.log (result);
      console.log(typeof(result));
      return result;
    });
  }

   getRefreshToken() {
    return this.storage.get(this.REFRESH_TOKEN);
  }

  private removeTokens() {
    this.storage.remove(this.JWT_TOKEN);
    this.storage.remove(this.REFRESH_TOKEN);
  }

  private storeJwtToken(jwt: string) {
    this.storage.set(this.JWT_TOKEN, jwt);
  }

  private doLogoutUser() {
    this.loggedUser = null;
    this.removeTokens();
  }
}
