import { Injectable } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/auth";
import { GooglePlus } from '@ionic-native/google-plus/ngx';
import { auth } from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private AFauth: AngularFireAuth,
    private google: GooglePlus,
  ) { }

  login(phoneNumber: string, password: string) { }

  loginWithGoogle() {
    return this.google.login({}).then(result => {
      const userDataGoogle = result;
      return this.AFauth.signInWithCredential(auth.GoogleAuthProvider.credential(null, userDataGoogle.accessToken));
    });
  }

}
