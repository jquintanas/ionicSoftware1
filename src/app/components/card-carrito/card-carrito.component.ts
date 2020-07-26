import { Component, OnInit, Input } from '@angular/core';
import { ProductoCarrito } from "src/app/core/interface/productoCarrito";
import { CarritoService } from 'src/app/core/services/cart/carrito.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-card-carrito',
  templateUrl: './card-carrito.component.html',
  styleUrls: ['./card-carrito.component.scss'],
})
export class CardCarritoComponent implements OnInit {
  // private banderas
  private banderaLoading: boolean = true;
  @Input("precio") precioString: string;
  @Input("Titulo") titulo: string;
  @Input("imagen") img: string;
  @Input("clave1") clave1: any;
  @Input("clave2") clave2: any;
  @Input("cantidad") cantidad: any;
  precio: number;
  productos: Map<any, any>;
  constructor(private alertController: AlertController, private carrito: CarritoService) { }

  ngOnInit() {
    if (!this.precioString) {
      this.precioString = "0";
    }
    if (!this.titulo) {
      this.titulo = "";
    }
    this.precio = Number(this.precioString);
    this.productos = this.carrito.getMapaProductos();
  }

  cambiarBandera() {
    this.banderaLoading = !this.banderaLoading;
  }

  async decrementarProducto(cantidad: number, clave1: any, clave2: any) {
    const tmp: ProductoCarrito = this.productos.get(clave1).get(clave2);
    if (tmp.cantidad > 1) {
      this.incrementarProducto(-cantidad, clave1, clave2);
      return;
    }
  }

  incrementarProducto(incremento: number, clave: any, clave2: any) {
    const tmp: ProductoCarrito = this.productos.get(clave).get(clave2);
    const te: ProductoCarrito = {
      id: tmp.id,
      cantidad: incremento,
      producto: tmp.producto
    };
    this.carrito.agregarAlCarrito(tmp.producto.categoria, te);
  }

  async eliminarProducto(clave: any, clave2: any) {
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
            this.incrementarProducto(-1, clave, clave2);
            const tmp: ProductoCarrito = this.productos.get(clave).get(clave2);
            this.carrito.eliminarProducto(tmp.producto.categoria, tmp);
          }
        }
      ]
    });
    await alert.present();

  }
}
