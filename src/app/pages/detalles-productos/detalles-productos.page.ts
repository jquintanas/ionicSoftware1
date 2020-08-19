import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { CarritoService } from "src/app/core/services/cart/carrito.service";
import { DetalleProducto } from "src/app/core/interface/productoDetalle";
import { ProductoCarrito } from "src/app/core/interface/productoCarrito";
import { trigger, state, style, animate, transition } from '@angular/animations';
import { FavoritosService } from "src/app/core/services/cart/favoritos.service";
import { Favoritos } from "src/app/core/interface/favoritosStorage";
import { ToastController } from '@ionic/angular';
import { AuthService } from 'src/app/core/services/auth/auth.service';

@Component({
  selector: 'app-detalles-productos',
  templateUrl: './detalles-productos.page.html',
  styleUrls: ['./detalles-productos.page.scss'],
  animations: [
    trigger('popOverState', [
      state('show', style({
        height: "50%"

      })),
      state('hide', style({
        height: "5%"
      })),
      transition('show => hide', animate('600ms linear')),
      transition('hide => show', animate('1000ms linear'))
    ]),
    trigger('venta', [
      state('visible', style({
        height: "15%"

      })),
      state('oculto', style({
        height: "0"
      })),
      transition('visible => oculto', animate('600ms linear')),
      transition('oculto => visible', animate('1000ms linear'))
    ])
  ]
})
export class DetallesProductosPage implements OnInit {
  slideOpts = {
    initialSlide: 0,
    speed: 400,
    autoplay: true,
    setWrapperSize: true,
    slidesPerView: 1
  };
  detalleProducto: DetalleProducto;
  listaImagenes: string[];
  banderaCorazon: boolean;
  cantidad: number;
  nombreProducto: string;
  precioProducto: number;
  descripcionProducto: string;
  // banderas animations
  show = true;
  // banderas contenido
  contenidoFooter: boolean = true;
  banderaPrecio: boolean = true;
  ocultarSheetInferior: boolean = false;
  banderasLoading: boolean[] = [];
  constructor(
    private alertController: AlertController,
    private carrito: CarritoService,
    private modalController: ModalController,
    private toastController: ToastController,
    private favoritos: FavoritosService,
    private authService: AuthService) { }

  ngOnInit() {
    // const token: any = await this.authService.getToken();
    const token: any = this.authService.getToken2();
    console.log("token obtenido", token);
    this.detalleProducto = this.carrito.getProductoDetalle();
    if (this.detalleProducto.cantidad == null) {
      this.detalleProducto.cantidad = 0;
    }
    this.listaImagenes = this.detalleProducto.carrusel;
    this.banderaCorazon = this.detalleProducto.Favorito;
    this.cantidad = this.detalleProducto.cantidad;
    this.nombreProducto = this.detalleProducto.Titulo;
    this.precioProducto = this.detalleProducto.Precio;
    this.descripcionProducto = this.detalleProducto.Descripcion;
    this.llenarBanderasLoading();
  }

  async marcarFavorito() {
    this.banderaCorazon = !this.banderaCorazon;
    this.detalleProducto.Favorito = this.banderaCorazon;
    this.carrito.setProductoDetalle(this.detalleProducto);
    if (this.banderaCorazon) {
      const tmp: Favoritos = {
        categoria: this.detalleProducto.categoria,
        idProducto: this.detalleProducto.id,
        url: this.detalleProducto.ImagenP
      };
      await this.favoritos.agregarFavorito(tmp).then(
        async dt => {
          if (dt) {
            const toast = await this.toastController.create({
              message: "No se pudo agregar a favoritos",
              duration: 2000,
              position: "top"
            });
            toast.present();
            this.banderaCorazon = false;
          }
        }
      ).catch(
        err => {
          console.log(err);
        }
      );
    } else {
      await this.favoritos.borrarDeFavoritos(this.detalleProducto.id).then(
        async dt => {
          if (dt) {
            this.banderaCorazon = false;
          } else {
            this.banderaCorazon = true;
            const toast = await this.toastController.create({
              message: "No se pudo eliminar de favoritos",
              duration: 2000,
              position: "top"
            });
            toast.present();
          }
        }
      ).catch(
        err => {
          console.log(err);
        }
      );
    }
    this.detalleProducto.Favorito = this.banderaCorazon;
    this.carrito.setProductoDetalle(this.detalleProducto);
  }

  async decrementarProducto() {
    if (this.cantidad > 1) {
      this.incrementarProducto(-1);
      return;
    }
    const alert = await this.alertController.create({
      header: 'Seguro que desea continuar!',
      message: 'Desea <strong>eliminar</strong> el producto!!!',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: "btnPintado",
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Ok',
          handler: () => {
            this.incrementarProducto(-1);
          }
        }
      ]
    });
    await alert.present();
  }

  incrementarProducto(incremento: number) {
    this.cantidad += incremento;
    this.detalleProducto.cantidad = this.cantidad;
    this.carrito.setProductoDetalle(this.detalleProducto);
    const producto: ProductoCarrito = {
      id: this.detalleProducto.id,
      cantidad: incremento,
      producto: this.detalleProducto
    };
    this.carrito.agregarAlCarrito(this.detalleProducto.categoria, producto);
  }

  regresar() {
    this.modalController.dismiss();
    this.favoritos.notificarCambio(true);
  }

  get stateName() {
    return this.show ? 'show' : 'hide';
  }

  get stateNameVentas() {
    return this.banderaPrecio ? 'oculto' : 'visible';
  }

  bajarSheetFooter() {
    this.show = !this.show;
    if (this.show) {
      this.contenidoFooter = true;
    } else {
      setTimeout(() => {
        this.contenidoFooter = false;
      }, 600);
    }
  }

  bajarSheetTop() {
    this.banderaPrecio = !this.banderaPrecio;
    if (!this.banderaPrecio) {
      setTimeout(() => {
        this.ocultarSheetInferior = true;
      }, 600);
    } else {
      this.ocultarSheetInferior = false;
      setTimeout(() => {
        this.bajarSheetFooter();
      }, 50);
      return;
    }
    this.bajarSheetFooter();

  }

  llenarBanderasLoading() {
    for (let i = 0; i < this.listaImagenes.length; i++) {
      this.banderasLoading.push(true);
    }
  }

  desactivarLoading(indice: number) {
    this.banderasLoading[indice] = false;
  }
}
