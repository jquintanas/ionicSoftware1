import { Injectable } from '@angular/core';
import { SeguridadService } from 'src/app/core/services/seguridad.service';
import { environment } from 'src/environments/environment';
import { UpdateInterface } from 'src/app/core/interface/usuarioUpdate';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserInfoService {
  public cedula: string = "";
  public nombre: string = "";
  public apellido: string = "";
  public telefono: string = "";
  public email: string = "";
  public direccion: string = "";
  public usuario: string = "";

  constructor(
    private seguridad: SeguridadService,
    private http: HttpClient
  ) { }

  setUserInfo(datos: UpdateInterface) {
  const hash = this.seguridad.hashJSON(datos);
  datos.hash = hash;
  const url = environment.rutas.updateUser + datos.cedula;
  return this.http.put(url, datos);
  }
}
