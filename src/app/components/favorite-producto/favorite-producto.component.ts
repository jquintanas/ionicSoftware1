import { Component, OnInit, Input, EventEmitter, Output } from "@angular/core";
import { FavoritosService } from 'src/app/core/services/cart/favoritos.service';

/**
 *
 * @desc card to show the products marked as favorites
 * @export
 * @class FavoriteProductoComponent
 * @implements {OnInit}
 */
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
  @Output("notificar") propagar = new EventEmitter<boolean>();
  banderaLoading: boolean = true;

  constructor(private favoritoService: FavoritosService) { }

  ngOnInit() {
    // console.log(this.url);
    this.banderaCorazon = true;
    // this.favorito.publica
  }

  /**
   *
   * @desc Remove the product associated with the card from the favorites list
   * @memberof FavoriteProductoComponent
   */
  async desmarcarFavorito() {
    await this.favoritoService.borrarDeFavoritos(this.id).then(
      (data: boolean) => {
        if (data) {
          this.propagar.emit(false);
        }
      }
    );

  }



}
