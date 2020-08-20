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
export class UserInfoService {
  public cedula: string;
  public nombre: string = "";
  public apellido: string = "";
  public telefono: string = "";
  public email: string = "";
  public direccion: any;
  public usuario: string = "";
  public referencia: string = "";
  constructor(
    private seguridad: SeguridadService,
    private http: HttpClient,
    private firebase: AngularFirestore
  ) { }


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
}
