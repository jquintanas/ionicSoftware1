import { Injectable } from '@angular/core';
import {AngularFireAuth} from "@angular/fire/auth"

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private AFauth: AngularFireAuth) { }

  login(phoneNumber: string, password: string){

    
    this.AFauth.signInWithEmailAndPassword(phoneNumber,password).then(res => {
      console.log('Estas logeado : ' + res)
    }).catch(err => console.log('error : ' + err))

    //this.AFauth.signInWithPhoneNumber(number, APPVERIFIER);
  }
}
