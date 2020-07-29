import { Injectable } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/auth";
import * as firebase from 'firebase/app';
import { AlertsService } from '../alerts/alerts.service';
import { NavController } from '@ionic/angular';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook/ngx';
import { HttpService } from '../http/http.service';
import { Router } from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private AFauth: AngularFireAuth,
    public alertsService: AlertsService,
    private navController: NavController,
    private fb: Facebook,
    private http: HttpService,
    private router: Router
  ) { }

  login(email, password){
    // tslint:disable-next-line: object-literal-key-quotes
    const JSON = { "email": email, "clave": password }
    this.http.getUser(JSON).subscribe(data => {
      if (data != null) {
        console.log(data);

        this.AFauth.signInWithEmailAndPassword(email, password).catch(function(error) {
          var errorCode = error.code;
          var errorMessage = error.message;
          console.log(errorCode, errorMessage);
        });
        this.alertsService.presentLoading("Bienvenido a" + " Omi & Pali");
        this.router.navigateByUrl("home");
      } else {
        console.log("Datos invalidos");
      }
    });
  }

  async loginGoogle() {
    this.AFauth.signInWithRedirect(new firebase.auth.GoogleAuthProvider())
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
    firebase.auth().signOut().then(function() {
    }).catch(function(error) {
      console.log(error);
    });
    this.router.navigateByUrl("login");
  }
}
