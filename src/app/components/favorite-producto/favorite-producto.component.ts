import { Component, OnInit, Input } from "@angular/core";
import { Storage } from "@ionic/storage";
import { environment } from "src/environments/environment";
import { Favoritos } from "src/app/interface/favoritosStorage";
//import {FavoritoService} from "src/app/services/favorito/favorito.service"
//import {PerfilUsuarioPage} from "src/app/pages/perfil-usuario/perfil-usuario.page"

@Component({
  selector: "app-favorite-producto",
  templateUrl: "./favorite-producto.component.html",
  styleUrls: ["./favorite-producto.component.scss"],
})
export class FavoriteProductoComponent implements OnInit {
  @Input("Imagen") url: string;
  @Input("Favorito") banderaCorazon: boolean;
  @Input("id") id: string;
  @Input("categoria") categoria: number;

  private banderaLoading: boolean = true;

  constructor(private storage: Storage) {}

  ngOnInit() {
    //console.log(this.url);
    this.banderaCorazon = true;
    this.banderaLoading = false;
   // this.favorito.publica
      }

  desmarcarFavorito() {
    
    this.banderaCorazon = !this.banderaCorazon;
    this.banderaLoading = true;
    this.storage
      .get(environment.codigoFavoritos)
      .then((data: Favoritos[]) => {
        if (data) {
          let tmp: Favoritos = {
            categoria: this.categoria,
            idProducto: this.id,
            url: this.url,
          };
          let tmpData: Favoritos[] = this.eliminarDeFavoritos(data, tmp);
          this.storage.set(environment.codigoFavoritos, tmpData);
         // this.mostrarPanel()
        }
      })
      .catch((err: any) => {
        console.log(err);
      });
  }

  private eliminarDeFavoritos(data: Favoritos[], producto: Favoritos) {
   // console.log("AQUI SE ELIMINA")
    let tmp: Favoritos[] = [];
    for (let i = 0; i < data.length; i++) {
      if (
        data[i].categoria == producto.categoria &&
        data[i].idProducto != producto.idProducto
      ) {
        tmp.push(data[i]);
      }
     // this.perfil.mostrarFavorito
    }
    return tmp;
  }


}
