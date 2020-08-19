import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";
@Injectable({
  providedIn: 'root'
})
export class HistorialService {

  constructor(
    private http: HttpClient
  ) { }

  public obtenerHistorial() {
    const url: string = environment.rutas.urlHistorial + environment.rutas.urlHistorialUsuario;
    return this.http.get(url);
  }
}
