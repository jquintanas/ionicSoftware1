import { Injectable } from '@angular/core';
declare var require: any;
import * as CryptoJS from "crypto-js";
const AES = CryptoJS.AES;
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: 'root'
})
export class SeguridadService {

  constructor() { }

  public hashJSON(json: any) {
    let data: string = "";
    // tslint:disable-next-line: prefer-const
    for (let clave in json) {
      if (json.hasOwnProperty(clave)) {
        data += clave + ":" + json[clave] + ",";
      }
    }
    return CryptoJS.SHA256(data).toString();
  }

  public generarHashClave(clave: string) {
    return CryptoJS.SHA256(clave).toString();
  }
  public encriptar(cadena: string) {
    const clave = environment.secretEncryp;
    return AES.encrypt(cadena, clave).toString().replace(/\//gi, "-");
  }

  public desencriptar(cadena: string) {
    const clave = environment.secretEncryp;
    const cade = cadena.replace(/-/gi, "/");
    const bytes = AES.decrypt(cade, clave);
    return bytes.toString(CryptoJS.enc.Utf8);
  }
}
