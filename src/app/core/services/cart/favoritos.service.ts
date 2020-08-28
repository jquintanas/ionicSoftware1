import { Injectable } from '@angular/core';
import { environment } from "src/environments/environment";
import { Favoritos } from "src/app/core/interface/favoritosStorage";
import { BehaviorSubject, Observable } from 'rxjs';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
/**
 *
 * @desc product control service marked as favorites
 * @export
 * @class FavoritosService
 */
@Injectable({
  providedIn: 'root'
})

export class FavoritosService {

  private favoritosSubject = new BehaviorSubject(false);

  constructor(private nativeStorage: NativeStorage) { }

  /**
   * @desc creates an observer that helps to identify if a product has been marked as a favorite so that it is updated on all the screens that are being displayed
   *
   * @returns {Observable<boolean>}
   * @memberof FavoritosService
   */
  observadorFavoritos(): Observable<boolean> {
    return this.favoritosSubject.asObservable();
  }

  notificarCambio(bandera: boolean) {
    this.favoritosSubject.next(bandera);
  }

  /**
   *
   * @desc check if a product is bookmarked
   * @private
   * @param {string} idFavorito
   * @param {Favoritos[]} listaFavoritos
   * @returns
   * @memberof FavoritosService
   */
  private isFavorito(idFavorito: string, listaFavoritos: Favoritos[]) {
    if (!listaFavoritos) {
      return false;
    }
    for (const f of listaFavoritos) {
      if (f.idProducto == idFavorito) {
        return true;
      }
    }
    return false;
  }

  async obtenerFavoritosLista(): Promise<Favoritos[]> {
    return await this.nativeStorage.getItem(environment.codigoFavoritos).then(
      data => {
        console.log(data);
        return data;
      },
      err => {
        console.log(err);
        console.log("error en favoritos");
        return [];
      }
    );
  }

  /**
   *
   * @desc add a product to favorites and store it in the device storage
   * @param {Favoritos} favorito
   * @returns
   * @memberof FavoritosService
   */
  async agregarFavorito(favorito: Favoritos) {
    let listaFavoritos: Favoritos[];
    await this.obtenerFavoritosLista().then(
      data => {
        console.log(data);
        console.log("data de promesa");
        listaFavoritos = data;
      }
    ).catch(
      err => {
        console.log(err);
        listaFavoritos = [];
      }
    );
    if (!this.isFavorito(favorito.idProducto, listaFavoritos)) {
      console.log(listaFavoritos);
      listaFavoritos.push(favorito);
      return this.nativeStorage.setItem(environment.codigoFavoritos, listaFavoritos).then(
        () => {
          console.log("stored");
          return true;
        },
        err => {
          console.log(err);
          return false;
        }
      );
    }
  }

  async comprobarFavorito(idFavorito: string) {
    let listaFavoritos: Favoritos[];
    await this.obtenerFavoritosLista().then(
      data => {
        listaFavoritos = data;
      }
    ).catch(
      err => {
        console.log(err);
        listaFavoritos = null;
      }
    );
    return this.isFavorito(idFavorito, listaFavoritos);
  }

  private async actualizarStorage(listaFavoritos: Favoritos[]) {
    return await this.nativeStorage.setItem(environment.codigoFavoritos, listaFavoritos).then(
      () => {
        console.log("stored");
        return true;
      },
      err => {
        console.log(err);
        return false;
      }
    );
  }

  /**
   *
   * @desc removes the selected product from the favorites list and removes it from the phone's storage
   * @param {string} idFavorito
   * @returns
   * @memberof FavoritosService
   */
  async borrarDeFavoritos(idFavorito: string) {
    let bandera: boolean = false;
    let listaFavoritos: Favoritos[];
    await this.obtenerFavoritosLista().then(
      data => {
        listaFavoritos = data;
      }
    ).catch(
      err => {
        console.log(err);
        listaFavoritos = [];
      }
    );
    if (this.isFavorito(idFavorito, listaFavoritos)) {
      const tmp: Favoritos[] = [];
      for (const t of listaFavoritos) {
        if (t.idProducto != idFavorito) {
          tmp.push(t);
        }
      }
      await this.actualizarStorage(tmp).then(
        dt => {
          if (dt) {
            bandera = true;
          }
        }
      ).catch(
        err => {
          console.log(err);
          bandera = false;
        }
      )
    }
    return bandera;
  }

}
