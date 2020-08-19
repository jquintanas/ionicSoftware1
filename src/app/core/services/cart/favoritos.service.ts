import { Injectable } from '@angular/core';
import { environment } from "src/environments/environment";
import { Favoritos } from "src/app/core/interface/favoritosStorage";
import { BehaviorSubject, Observable } from 'rxjs';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
@Injectable({
  providedIn: 'root'
})
export class FavoritosService {

  private favoritosSubject = new BehaviorSubject(false);

  constructor(private nativeStorage: NativeStorage) { }

  observadorFavoritos(): Observable<boolean> {
    return this.favoritosSubject.asObservable();
  }

  notificarCambio(bandera: boolean) {
    this.favoritosSubject.next(bandera);
  }

  // async agregarFavorito(categoria: string, favorito: Favoritos) {
  //   let mapaFavoritos: Map<string, Map<string, Favoritos>>;
  //   await this.obtenerFavoritos().then((data: Map<string, Map<string, Favoritos>>) => {
  //     mapaFavoritos = data;
  //   });
  //   if (mapaFavoritos == null) {
  //     let favoritos: Map<string, Map<string, Favoritos>> = new Map();
  //     let tmp: Map<string, Favoritos> = new Map();
  //     tmp.set(favorito.idProducto, favorito);
  //     favoritos.set(categoria, tmp);
  //     await this.nativeStorage.setItem(environment.codigoFavoritos, favoritos).then(
  //       () => {
  //         console.log("stored");
  //       },
  //       err => {
  //         console.log(err);
  //         return false;
  //       }
  //     );
  //     return true;
  //   }
  //   const tmp = this.convertirMapaALista(mapaFavoritos);
  //   if (this.soportaMasElementos(tmp)) {
  //     let data = mapaFavoritos.get(categoria);
  //     if (data == null) {
  //       const map: Map<string, Favoritos> = new Map();
  //       mapaFavoritos.set(categoria, map);
  //       data = mapaFavoritos.get(categoria);
  //     }
  //     if (data.get(favorito.idProducto) == null) {
  //       data.set(favorito.idProducto, favorito);
  //       mapaFavoritos.set(categoria, data);
  //       await this.nativeStorage.setItem(environment.codigoFavoritos, mapaFavoritos).then(
  //         () => {
  //           console.log("stored");
  //           return true;
  //         },
  //         err => {
  //           console.log(err);
  //           console.log("error en agregar");
  //           return false;
  //         }
  //       );
  //     }
  //   }
  //   return false;
  // }

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

  // async comprobarFavorito(categoria: string, idProducto: string) {
  //   let favoritos: Map<string, Map<string, Favoritos>>;
  //   await this.obtenerFavoritos().then((data: any) => {
  //     favoritos = data;
  //   });
  //   if (favoritos == null) {
  //     return false;
  //   }

  //   if (favoritos.get(categoria) == null) {
  //     return false;
  //   }

  //   return favoritos.get(categoria).get(idProducto) != null;

  // }

  // async obtenerFavoritos(): Promise<Map<string, Map<string, Favoritos>>> {
  //   return await this.nativeStorage.getItem(environment.codigoFavoritos).then(
  //     data => {
  //       console.log(data);
  //       return data;
  //     },
  //     err => {
  //       console.log(err);
  //       console.log("error en favoritos");
  //       return null;
  //     }
  //   );
  //   // (data: Map<string, Map<string, Favoritos>>) => {

  //   // }
  // }

  // convertirMapaALista(favoritos: Map<string, Map<string, Favoritos>>) {
  //   // tslint:disable-next-line: prefer-const
  //   let tmp: Favoritos[] = [];
  //   if (favoritos) {
  //     // tslint:disable-next-line: prefer-const
  //     for (let data of favoritos.values()) {
  //       // tslint:disable-next-line: prefer-const
  //       for (let favorito of data.values()) {
  //         tmp.push(favorito);
  //       }
  //     }
  //   }
  //   return tmp;
  // }

  private soportaMasElementos(arrayFavoritos: any[]) {
    return arrayFavoritos.length < 10;
  }

  // async borrarDeFavoritos(categoria: string, idProducto: string) {
  //   try {
  //     let favoritos: Map<string, Map<string, Favoritos>>;
  //     await this.obtenerFavoritos().then((data: any) => {
  //       favoritos = data;
  //     });
  //     const tmp: Map<string, Favoritos> = favoritos.get(categoria);
  //     tmp.delete(idProducto);
  //     favoritos.set(categoria, tmp);
  //     await this.nativeStorage.setItem(environment.codigoFavoritos, favoritos).then(
  //       () => {
  //         console.log("stored");
  //       },
  //       err => {
  //         console.log(err);
  //         console.log("error en borrar");
  //       }
  //     );
  //     return true;
  //   } catch (error) {
  //     return false;
  //   }
  // }
}
