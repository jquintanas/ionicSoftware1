import { Injectable } from '@angular/core';
import { SeguridadService } from 'src/app/core/services/seguridad.service';
import { environment } from 'src/environments/environment';
import { UpdateInterface } from 'src/app/core/interface/usuarioUpdate';
import { HttpClient } from '@angular/common/http';
import { Usuario } from 'src/app/core/interface/modelNOSQL/usuario';
import { AngularFirestore } from "@angular/fire/firestore";

@Injectable({
  providedIn: 'root'
})
/**
 * @classdesc Container class of UserIndo Service.
 * @desc Creation Date: 08/20/2020
 * @class
 * @public
 * @version 1.0.0
 * @author Francesca Man Ging <fman@espol.edu.ec>
 */
export class UserInfoService {
  public cedula: string;
  public nombre: string = "";
  public apellido: string = "";
  public telefono: string = "";
  public email: string = "";
  public direccion: any;
  public usuario: string = "";
  public referencia: string = "";
  public contrasenia: string;
  constructor(
    private seguridad: SeguridadService,
    private http: HttpClient,
    private firebase: AngularFirestore
  ) { }

 /**
   *
   * @desc Set user info
   * @param {UpdateInterface} datos
   * @memberof UserInfoService
   */

  setUserInfo(datos: UpdateInterface) {
    const hash = this.seguridad.hashJSON(datos);
    datos.hash = hash;
    datos.cedula = this.cedula;
    console.log(datos);
    const url = environment.rutas.updateUser + datos.cedula;
    return this.http.put(url, datos);
  }

  pushProductos(usuario: Usuario) {
    const id = this.firebase.createId();
    usuario.idUsuario = id;
    return this.firebase
      .collection(environment.nombresTablasFirebase.usuario)
      .doc(id)
      .set(usuario);
  }

  updatePhotoUser(usuario: Usuario) {
    console.log(usuario);
    this.firebase.collection(environment.nombresTablasFirebase.usuario)
      .doc(usuario.cedula)
      .update(usuario)
      // tslint:disable-next-line: only-arrow-functions
      .then(function() {
        console.log("Imagen subida con exito");
      })
      // tslint:disable-next-line: only-arrow-functions
      .catch(function() {
        console.log("Error al subir imagen");
      });
  }

  userExist(email: string) {
    this.http.get(environment.rutas.getUser).toPromise().then( (dt) => {
      console.log(dt);
      for (let i = 0; i < Object.keys(dt).length; i++) {
        if (dt[i].email == email) {
          console.log("el usuario existe");
          return 0;
        } else {
          console.log ("el usuario no existe");
        }
      }
    });
  }
}
