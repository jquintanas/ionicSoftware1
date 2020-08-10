import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserInfoService {
  private cedula: string;
  private nombre: string;
  private apellido: string;
  private telefono: string;
  private email: string;
  private direccion: string;

  constructor() { }

  setUserInfo(data) {
    this.email = data.data.email;
    this.nombre = data.data.nombre;
    this.apellido = data.data.apellido;
    this.telefono = data.data.telefono;
    this.direccion = data.data.direccion;
    this.cedula = data.data.cedula;
  }

  getUserPhone() {
    return this.telefono;
  }

  getUserEmail() {
    return this.email;
  }

  getUserName() {
    return this.nombre;
  }

  getUserLastname() {
    return this.apellido;
  }

  getUseAddress() {
    return this.direccion;
  }

  getUserId() {
    return this.cedula;
  }
}
