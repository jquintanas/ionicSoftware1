import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UsuarioInterface } from "src/app/core/interface/usuarioRegistro";
import { FirebaseAuthentication } from '@ionic-native/firebase-authentication/ngx';
import { environment } from 'src/environments/environment';
import { SeguridadService } from './seguridad.service';
@Injectable({
  providedIn: 'root'
})
export class RegistroService {

  constructor(private http: HttpClient, private seguridad: SeguridadService, private fbAuthN: FirebaseAuthentication) { }

  public guardarPerfil(datos: UsuarioInterface) {
    const hash = this.seguridad.hashJSON(datos);
    datos.hash = hash;
    const url = environment.urlBaseApi + environment.urlPerfil;
    return this.http.post(url, datos);
  }

  public registrarTelefonoFireBase(numero: string) {
    return this.fbAuthN.verifyPhoneNumber(numero, 30000);
  }

  public verificarCodigoFireBase(verificationID: string, smsCode: string) {
    return this.fbAuthN.signInWithVerificationId(verificationID, smsCode);
  }
}