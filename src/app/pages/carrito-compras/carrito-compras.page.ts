import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { CarritoService } from 'src/app/services/cart/carrito.service';
import { productoCarrito } from 'src/app/interface/productoCarrito';

@Component({
  selector: 'app-carrito-compras',
  templateUrl: './carrito-compras.page.html',
  styleUrls: ['./carrito-compras.page.scss'],
})
export class CarritoComprasPage implements OnInit {
  cantidad: number = 0;
  total: number = 0;
  productos: Map<any, any>;
  constructor(private alertController: AlertController, private carrito: CarritoService) { }

  ngOnInit() {
    this.carrito.observarCarrito().subscribe((data: any) => {
      if (data) {
        this.productos = data;
        for (let valor of this.productos.values()) {
          for (let data of valor.values()) {
            let tmp = data.cantidad * data.producto.Precio;
            this.total += tmp;
          }
        }
      }
    }, (err: any) => {
      console.log(err);
    });
    this.carrito.observarCantidad().subscribe((data: number) => {
      this.cantidad = data;
    }, (err: any) => {
      console.log(err);
    })
  }

  async decrementarProducto(cantidad: number, clave1: any, clave2: any) {
    let tmp: productoCarrito = this.productos.get(clave1).get(clave2);
    if (tmp.cantidad > 1) {
      this.incrementarProducto(-cantidad, clave1, clave2);
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
            this.incrementarProducto(-1, clave1, clave2);
            this.eliminarProducto(clave1, clave2);
          }
        }
      ]
    });
    await alert.present();

  }

  incrementarProducto(incremento: number, clave: any, clave2: any) {
    let tmp: productoCarrito = this.productos.get(clave).get(clave2);
    let te: productoCarrito = {
      id: tmp.id,
      cantidad: incremento,
      producto: tmp.producto
    };
    this.carrito.agregarAlCarrito(tmp.producto.categoria, te);
  }

  eliminarProducto(clave: any, clave2: any) {
    let tmp: productoCarrito = this.productos.get(clave).get(clave2);
    this.carrito.eliminarProducto(tmp.producto.categoria, tmp);
  }

  async eliminarTodo() {
    let alert = await this.alertController.create({
      header: 'Seguro que desea continuar!',
      message: 'Desea <strong>eliminar</strong> el pedido!!!',
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
            this.carrito.borrarCarrito();
          }
        }
      ]
    });
    await alert.present();
  }

  async borrarProductoLista(clave1: any, clave2: any) {
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
            let tmp: productoCarrito = this.productos.get(clave1).get(clave2);
            let cant = tmp.cantidad;
            this.decrementarProducto(cant, clave1, clave2);
            this.eliminarProducto(clave1, clave2);
          }
        }
      ]
    });
    await alert.present();

  }
}
