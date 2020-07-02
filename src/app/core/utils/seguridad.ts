declare var require: any
let crypto = require('crypto');
var AES = require("crypto-js/aes");
var CryptoJS = require("crypto-js");
import { environment } from "src/environments/environment";

export class Seguridad {

    static hashJSON(json: any) {
        let data: string = "";
        for (let clave in json) {
            if (json.hasOwnProperty(clave)) {
                data += clave + ":" + json[clave] + ","
            }
        }
        return crypto.createHash('sha256').update(data).digest('hex');
    }


    public static encriptar(cadena: string) {
        let clave = environment.secretEncryp;
        return AES.encrypt(cadena, clave).toString().replace(/\//gi, "-");
    }

    public static desencriptar(cadena: string) {
        let clave = environment.secretEncryp;
        let cade = cadena.replace(/-/gi, "/");
        let bytes = AES.decrypt(cade, clave);
        return bytes.toString(CryptoJS.enc.Utf8);
    }

}