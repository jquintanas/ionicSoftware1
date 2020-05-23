import { Component, OnInit, ViewChild } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { CarritoService } from "src/app/services/cart/carrito.service";
import { detalleProducto } from "src/app/interface/productoDetalle";
import { productoCarrito } from "src/app/interface/productoCarrito";
@Component({
  selector: 'app-detalles-productos',
  templateUrl: './detalles-productos.page.html',
  styleUrls: ['./detalles-productos.page.scss'],
})
export class DetallesProductosPage implements OnInit {
  //@ViewChild('slide', { static: false }) slide: IonSlides;
  slideOpts = {
    initialSlide: 0,
    speed: 400,
    autoplay: true,
    setWrapperSize: true,
    slidesPerView: 1
  };
  detalleProducto: detalleProducto;
  listaImagenes: string[];
  banderaCorazon: boolean;
  cantidad: number;
  nombreProducto: string;
  precioProducto: number;
  descripcionProducto: string;
  constructor(private alertController: AlertController, private carrito: CarritoService, private modalController: ModalController) { }

  ngOnInit() {
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
  }

  marcarFavorito() {
    this.banderaCorazon = !this.banderaCorazon;
    this.detalleProducto.Favorito = this.banderaCorazon;
    this.carrito.setProductoDetalle(this.detalleProducto);
  }

  async decrementarProducto() {
    if (this.cantidad > 1) {
      this.incrementarProducto(-1);
      // this.cantidad -= 1;
      // this.detalleProducto.cantidad = this.cantidad;
      // this.carrito.setProductoDetalle(this.detalleProducto);
      return;
    }
    let alert = await this.alertController.create({
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
    let producto: productoCarrito = {
      id: this.detalleProducto.id,
      cantidad: incremento,
      producto: this.detalleProducto
    };
    this.carrito.agregarAlCarrito(this.detalleProducto.categoria, producto);
  }

  async incrementarPersonalizado() {
    let alert = await this.alertController.create(
      {
        header: "Agregar productos al carrito!",
        message: "Ingrese la cantidad de productos a comprar.",
        inputs: [
          {
            name: 'cantidad',
            type: 'number',
            placeholder: 'Cantidad a comprar'
          }
        ],
        buttons: [
          {
            text: 'Cancel',
            role: 'cancel'
          },
          {
            text: 'Ok',
            cssClass: "btnPintado"
          }
        ]
      }
    );
    await alert.present();
    let { data } = await alert.onDidDismiss();
    if (data) {
      let numero = Number(data.values.cantidad);
      if (numero > 0) {
        this.incrementarProducto(numero);
      }
    }
  }

  async borrarProducto() {
    let alert = await this.alertController.create({
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
            this.incrementarProducto(-this.cantidad);
          }
        }
      ]
    });
    await alert.present();
  }

  regresar() {
    this.modalController.dismiss();
  }

}
