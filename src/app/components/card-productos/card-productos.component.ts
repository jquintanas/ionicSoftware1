import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { ModalController, AlertController, ToastController } from '@ionic/angular';
import { DetallesProductosPage } from "src/app/pages/detalles-productos/detalles-productos.page";
import { DetalleProducto } from "src/app/core/interface/productoDetalle";
import { CarritoService } from "src/app/core/services/cart/carrito.service";
import { ProductoCarrito } from "src/app/core/interface/productoCarrito";
import { Favoritos } from "src/app/core/interface/favoritosStorage";
import { FavoritosService } from 'src/app/core/services/cart/favoritos.service';

/**
 *
 * @desc Card component to display product data in the home page
 * @export
 * @class CardProductosComponent
 * @implements {OnInit}
 * @implements {OnDestroy}
 */
@Component({
  selector: 'app-card-productos',
  templateUrl: './card-productos.component.html',
  styleUrls: ['./card-productos.component.scss'],
})


export class CardProductosComponent implements OnInit, OnDestroy {

  // variables de entrada
  @Input("Imagen") urlImagen: string;
  @Input("carrusel") carrusel: string[];
  @Input("Titulo") titulo: string;
  @Input("Descripcion") descripcion: string;
  @Input("Precio") precio: number;
  @Input("Favorito") banderaCorazon: boolean;
  @Input("id") id: string;
  @Input("categoria") categoria: number;

  // variables internas
  banderaLoading: boolean = true;
  private detalle: DetalleProducto;
  cantidad: number = 0;
  abstract: string = "";
  private observadorCarrito: any;
  private observadorFavoritos: any;
  constructor(
    private modalController: ModalController,
    private carrito: CarritoService,
    private alertController: AlertController,
    private favoritos: FavoritosService,
    private toastController: ToastController) { }

  ngOnDestroy(): void {
    this.observadorCarrito.unsubscribe();
    this.observadorFavoritos.unsubscribe();
  }

  async ngOnInit() {
    if (this.titulo == null || this.titulo === "") {
      this.titulo = "Cargando...";
    }
    if (this.descripcion == null || this.descripcion === "") {
      this.descripcion = "Cargando...";
    }
    if (this.precio == null) {
      this.precio = 0;
    }
    this.crearAbstract();
    this.detalle = {
      id: this.id,
      Descripcion: this.descripcion,
      Favorito: this.banderaCorazon,
      ImagenP: this.urlImagen,
      carrusel: this.carrusel,
      Precio: this.precio,
      Titulo: this.titulo,
      categoria: this.categoria
    };
    this.observadorCarrito = this.carrito.observarCarrito().subscribe((data: Map<any, Map<string, ProductoCarrito>>) => {
      if (data != null) {
        if (data.get(this.detalle.categoria) != null) {
          if (data.get(this.detalle.categoria).get(this.detalle.id) != null) {
            this.cantidad = data.get(this.detalle.categoria).get(this.detalle.id).cantidad;
          }
        }
      }

    });
    this.observadorFavoritos = this.favoritos.observadorFavoritos().subscribe(async (data: boolean) => {
      if (data) {
        await this.verificarFavorito();
      }
    });
    await this.verificarFavorito();
  }


  /**
   *
   * @desc bookmark a product
   * @memberof CardProductosComponent
   */
  async marcarFavorito() {
    if (!this.banderaCorazon) {
      const favorito: Favoritos = {
        categoria: this.categoria,
        idProducto: this.id,
        url: this.urlImagen
      };
      await this.favoritos.agregarFavorito(favorito).then(
        async dt => {
          if (dt) {
            this.banderaCorazon = !this.banderaCorazon;
          } else {
            const toast = await this.toastController.create({
              message: "No se pudo agregar a favoritos",
              duration: 2000,
              position: "bottom"
            });
            toast.present();
          }
        }
      );
    } else {
      await this.eliminarDeFavoritos();
    }
    this.detalle.Favorito = this.banderaCorazon;
  }


  /**
   *
   * @desc add a product to the shopping cart
   * @memberof CardProductosComponent
   */
  async agregarAlCarrito() {
    // let cantida = await this.presentAlertPrompt();
    const cantida = 1;
    if (cantida > 0) {
      this.cantidad += cantida;
      this.detalle.cantidad = this.cantidad;
      const tmp: ProductoCarrito = {
        cantidad: cantida,
        id: this.detalle.id,
        producto: this.detalle
      };
      this.carrito.agregarAlCarrito(this.detalle.categoria, tmp);
    }
  }

  private crearAbstract() {
    const tmp = this.descripcion.split(" ");
    if (tmp.length > 7) {
      for (let i = 0; i < 7; i++) {
        this.abstract += tmp[i] + " ";
      }
      this.abstract += "...";
      return;
    }
    this.abstract = this.descripcion;
  }


  /**
   *
   * @desc open a modal with the detail of the product to see everything about it and make it easy for the customer to see if it is what they need
   * @memberof CardProductosComponent
   */
  async abrirDetalles() {
    this.carrito.setProductoDetalle(this.detalle);
    const modal = await this.modalController.create({
      component: DetallesProductosPage
    });
    await modal.present();
  }

  cambiarBandera() {
    this.banderaLoading = !this.banderaLoading;
  }

  private async presentAlertPrompt() {
    const alert = await this.alertController.create({
      header: 'Ingrese la cantidad a comprar',
      inputs: [
        {
          name: 'cantidad',
          type: 'number',
          placeholder: 'Cantidad..',
          value: 1
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
        }, {
          text: 'Ok',
          cssClass: 'btnPintado'
        }
      ]
    });
    await alert.present();
    const { data } = await alert.onDidDismiss();
    if (data) {
      if (data.values.cantidad === "") {
        return 0;
      }
      return Number(data.values.cantidad);
    }
    return 0;
  }

  /**
   *
   * @desc remove the product from the favorites list
   * @private
   * @memberof CardProductosComponent
   */
  private async eliminarDeFavoritos() {
    await this.favoritos.comprobarFavorito(this.id).then(
      async dt => {
        if (dt) {
          await this.favoritos.borrarDeFavoritos(this.id).then(
            async dta => {
              if (dta) {
                this.banderaCorazon = false;
              } else {
                const toast = await this.toastController.create({
                  message: "No se pudo eliminar de favoritos",
                  duration: 2000,
                  position: "bottom"
                });
                toast.present();
                this.banderaCorazon = true;
              }
            }
          );
        }
      }
    );

  }

  private async verificarFavorito() {
    await this.favoritos.comprobarFavorito(this.id).then(
      dt => {
        this.banderaCorazon = dt;
        this.detalle.Favorito = this.banderaCorazon;
      }
    ).catch(
      err => {
        console.log(err);
      }
    );
  }


}
