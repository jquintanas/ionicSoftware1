import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { Storage } from '@ionic/storage';
@Injectable({
  providedIn: 'root'
})
export class HistorialService {

  constructor(
    private http: HttpClient,
    private storage: Storage
  ) { }

  public obtenerHistorial() {
    const header = {
      // tslint:disable-next-line: max-line-length
      autorization: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjA5MjQ5OTU0MjYiLCJpYXQiOjE1OTY5Mzk1NDUsImV4cCI6MTU5Njk0MDQ0NX0.SpUgsmkzimScqM_Dql01g9Ib8RKX9UAZw9zZ8p7nwso"
    };
    const url: string = environment.rutas.urlHistorial + environment.rutas.urlHistorialUsuario;
    return this.http.get(url, { headers: header });
  }
}
