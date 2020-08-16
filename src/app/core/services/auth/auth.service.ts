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
import { LoadingController } from '@ionic/angular';
import { IDataUser } from "src/app/core/interface/dataUser.interface";
import { UserInfoService } from 'src/app/core/services/userInfo/user-info.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly JWT_TOKEN = 'JWT_TOKEN';
  private readonly REFRESH_TOKEN = 'REFRESH_TOKEN';
  token: Token;
  isAuth: boolean = false;
  dataUser: IDataUser;
  idUserFirebase: string;
  constructor(
    private AFauth: AngularFireAuth,
    public alertsService: AlertsService,
    private fb: Facebook,
    private httpClient: HttpClient,
    private router: Router,
    private storage: Storage,
    public loadingController: LoadingController,
    private userInfo: UserInfoService
  ) { }

  public loginToFirebase(email: string, password: string) {
    return new Promise((resolve, reject) => {
      this.AFauth.signInWithEmailAndPassword(email, password).then(
        res => {
          const dataAuth = {
            email: res.user.email,
            id: res.user.uid
          };
          resolve(dataAuth);
        }
      ).catch(err => {
        reject(err);
      });
    });
  }

  public loginToApi(email: string, clave: string) {
    const body = {
      email, clave
    };
    return this.httpClient.post(environment.rutas.urlLogin, body);
  }

  refreshToken() {
    console.log( {
      id: this.dataUser.cedula,
      refreshToken: this.token.refreshToken
    });
    return this.httpClient.post<any>(environment.rutas.urlToken,
      {
        id: this.dataUser.cedula,
        refreshToken: this.token.refreshToken
      });
  }

  async loginGoogle() {
    const provider = new firebase.auth.GoogleAuthProvider();
    this.AFauth.signInWithPopup(provider)
      .then((result) => {
        console.log(result);
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
    this.AFauth.signOut().then(
      data => { console.log(data); }
    ).catch(
      err => { console.log(err); }
    );
    this.doLogoutUser();
    this.router.navigateByUrl("login");
  }

  getToken() {
    return this.storage.get(this.JWT_TOKEN);
  }

  async getToken2(): Promise<any> {
    return await this.storage.get(this.JWT_TOKEN).then(data => {
      return data;
    });
  }


  private removeTokens() {
    this.storage.remove(this.JWT_TOKEN);
    this.storage.remove(this.REFRESH_TOKEN);
  }

  private doLogoutUser() {
    this.token = null;
    this.isAuth = false;
    this.dataUser = null;
    this.idUserFirebase = "";
    this.removeTokens();
  }
}
