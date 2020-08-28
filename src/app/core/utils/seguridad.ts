declare var require: any;
const crypto = require('crypto');
const AES = require("crypto-js/aes");
const CryptoJS = require("crypto-js");
import { environment } from "src/environments/environment";

/**
 *
 * 2desc security functions used by security service
 * @export
 * @class Seguridad
 */
export class Seguridad {

    /**
     *
     * @desc generate 256 hash based on provided json
     * @static
     * @param {*} json
     * @returns
     * @memberof Seguridad
     */
    static hashJSON(json: any) {
        let data: string = "";
        // tslint:disable-next-line: prefer-const
        for (let clave in json) {
            if (json.hasOwnProperty(clave)) {
                data += clave + ":" + json[clave] + ",";
            }
        }
        return crypto.createHash('sha256').update(data).digest('hex');
    }


    public static encriptar(cadena: string) {
        const clave = environment.secretEncryp;
        return AES.encrypt(cadena, clave).toString().replace(/\//gi, "-");
    }

    public static desencriptar(cadena: string) {
        const clave = environment.secretEncryp;
        const cade = cadena.replace(/-/gi, "/");
        const bytes = AES.decrypt(cade, clave);
        return bytes.toString(CryptoJS.enc.Utf8);
    }
}
