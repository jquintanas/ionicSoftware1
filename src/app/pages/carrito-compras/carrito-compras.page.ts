import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { CarritoService } from 'src/app/core/services/cart/carrito.service';

/**
 *
 * @desc shopping cart screen controller class
 * @export
 * @class CarritoComprasPage
 * @implements {OnInit}
 */
@Component({
  selector: 'app-carrito-compras',
  templateUrl: './carrito-compras.page.html',
  styleUrls: ['./carrito-compras.page.scss'],
})
export class CarritoComprasPage implements OnInit {
  cantidad: number = 0;
  total: number = 0;
  productos: Map<any, any>;
  constructor(
    private alertController: AlertController,
    private carrito: CarritoService,
    private router: Router) { }

  ngOnInit() {

    this.carrito.observarCarrito().subscribe((data: any) => {
      console.log(data);
      if (data) {
        this.total = 0;
        this.productos = data;
        // tslint:disable-next-line: prefer-const
        for (let valor of this.productos.values()) {
          // tslint:disable-next-line: prefer-const
          for (let dat of valor.values()) {
            const tmp = dat.cantidad * dat.producto.Precio;
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
    });
  }

  async eliminarTodo() {
    const alert = await this.alertController.create({
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

  comprar() {
    this.router.navigateByUrl('/pedido');
  }
}
