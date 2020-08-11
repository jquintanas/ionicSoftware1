import { Injectable } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserInfoService {
  public cedula: string = "";
  public usuario: string = "";
  public apellido: string = "";
  public telefono: string = "";
  public email: string = "";
  public direccion: string = "";

  constructor() { }
}
