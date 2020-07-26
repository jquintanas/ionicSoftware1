import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { environment } from "src/environments/environment";
import { Favoritos } from "src/app/core/interface/favoritosStorage";
import { BehaviorSubject, Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class FavoritosService {

  private favoritosSubject = new BehaviorSubject(false);

  constructor(private storage: Storage) { }

  observadorFavoritos(): Observable<boolean> {
    return this.favoritosSubject.asObservable();
  }

  notificarCambio(bandera: boolean) {
    this.favoritosSubject.next(bandera);
  }

  async agregarFavorito(categoria: string, favorito: Favoritos) {
    let mapaFavoritos: Map<string, Map<string, Favoritos>>;
    await this.obtenerFavoritos().then((data: Map<string, Map<string, Favoritos>>) => {
      mapaFavoritos = data;
    });
    if (mapaFavoritos == null) {
      const favoritos: Map<string, Map<string, Favoritos>> = new Map();
      // tslint:disable-next-line: no-shadowed-variable
      const tmp: Map<string, Favoritos> = new Map();
      tmp.set(favorito.idProducto, favorito);
      favoritos.set(categoria, tmp);
      this.storage.set(environment.codigoFavoritos, favoritos);

      return true;
    }
    const tmp = this.convertirMapaALista(mapaFavoritos);
    if (this.soportaMasElementos(tmp)) {
      let data = mapaFavoritos.get(categoria);
      if (data == null) {
        const map: Map<string, Favoritos> = new Map();
        mapaFavoritos.set(categoria, map);
        data = mapaFavoritos.get(categoria);
      }
      if (data.get(favorito.idProducto) == null) {
        data.set(favorito.idProducto, favorito);
        mapaFavoritos.set(categoria, data);
        this.storage.set(environment.codigoFavoritos, mapaFavoritos);
        return true;
      }
    }
    return false;
  }

  async comprobarFavorito(categoria: string, idProducto: string) {
    let favoritos: Map<string, Map<string, Favoritos>>;
    await this.obtenerFavoritos().then((data: any) => {
      favoritos = data;
    });
    if (favoritos == null) {
      return false;
    }

    if (favoritos.get(categoria) == null) {
      return false;
    }

    return favoritos.get(categoria).get(idProducto) != null;

  }

  async obtenerFavoritos(): Promise<Map<string, Map<string, Favoritos>>> {
    return await this.storage.get(environment.codigoFavoritos).then((data: Map<string, Map<string, Favoritos>>) => {
      return data;
    });
  }

  convertirMapaALista(favoritos: Map<string, Map<string, Favoritos>>) {
    // tslint:disable-next-line: prefer-const
    let tmp: Favoritos[] = [];
    if (favoritos) {
      // tslint:disable-next-line: prefer-const
      for (let data of favoritos.values()) {
        // tslint:disable-next-line: prefer-const
        for (let favorito of data.values()) {
          tmp.push(favorito);
        }
      }
    }
    return tmp;
  }

  private soportaMasElementos(arrayFavoritos: any[]) {
    return arrayFavoritos.length < 10;
  }

  async borrarDeFavoritos(categoria: string, idProducto: string) {
    try {
      let favoritos: Map<string, Map<string, Favoritos>>;
      await this.obtenerFavoritos().then((data: any) => {
        favoritos = data;
      });
      const tmp: Map<string, Favoritos> = favoritos.get(categoria);
      tmp.delete(idProducto);
      favoritos.set(categoria, tmp);
      this.storage.set(environment.codigoFavoritos, favoritos);
      return true;
    } catch (error) {
      return false;
    }
  }
}
