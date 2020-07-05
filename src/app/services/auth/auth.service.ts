import { Injectable } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/auth"
import { GooglePlus } from '@ionic-native/google-plus/ngx';
import { auth } from 'firebase';
//import {Router} from "@Angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private AFauth: AngularFireAuth, 
    private google: GooglePlus,
//    private router: Router
) {}

  login (phoneNumber: string, password: string){}

  loginWithGoogle() {
    return this.google.login({}).then(result => {
      const user_data_google = result;
      return this.AFauth.signInWithCredential(auth.GoogleAuthProvider.credential(null, user_data_google.accessToken))
    })
  }

  /*
  logout(){
    this.AFauth.signOut().then(auth =>{
      this.router.navigateByUrl("login")
    });
  }*/
}
