import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { CarritoService } from 'src/app/services/cart/carrito.service';

@Component({
  selector: 'app-carrito-compras',
  templateUrl: './carrito-compras.page.html',
  styleUrls: ['./carrito-compras.page.scss'],
})
export class CarritoComprasPage implements OnInit {
  cantidad: number = 0;
  total: number = 0;
  productos: Map<any, any>;
  constructor(private alertController: AlertController, private carrito: CarritoService,private router:Router) { }

  ngOnInit() {
    this.carrito.observarCarrito().subscribe((data: any) => {
      if (data) {
        this.total = 0;
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
  comprar(){
    this.router.navigateByUrl('/pedido');
  }
}
