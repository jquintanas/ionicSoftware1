import { Component, OnInit, ViewChild } from '@angular/core';
import { AlertController } from '@ionic/angular';
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
    setWrapperSize: true
  };
  listaImagenes: string[] = ["https://recetasfacil.online/wp-content/uploads/2018/06/postres-sin-horno-1.jpg", "https://cdn.aarp.net/content/dam/aarp/food/recipes/2018/10/1140-limofresa-gas-drink-esp.jpg", "https://i2.wp.com/www.diegocoquillat.com/wp-content/uploads/2018/06/tapa_bebidas.png?fit=700%2C336&ssl=1&resize=1280%2C720"];
  banderaCorazon: boolean = false;
  cantidad: number = 1;
  listaIngredientes = ["Ingrediente 1", "Ingrediente 2", "Ingrediente 3", "Ingrediente 4", "Ingrediente 5"];
  nombreProducto = "Torta de chocolate"
  precioProducto = 10.50;
  descripcionProducto = "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Repudiandae suscipit, delectus dolore rerum velit maxime eveniet fugiat corrupti facilis culpa nisi eum cum blanditiis perferendis, illum iste autem numquam obcaecati!";
  constructor(private alertController: AlertController) { }

  ngOnInit() {

  }

  marcarFavorito() {
    this.banderaCorazon = !this.banderaCorazon;
  }

  async decrementarProducto() {
    if (this.cantidad > 1) {
      this.cantidad -= 1;
      return;
    }
    let alert = await this.alertController.create({
      header: 'Seguro que desea continuar!',
      message: 'Desea <strong>eliminar</strong> el producto!!!',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Ok',
          cssClass: 'eliminar',
          handler: () => {
            console.log('Confirm Okay');
          }
        }
      ]
    });

    await alert.present();

  }

  incrementarProducto() {
    this.cantidad += 1;
  }

}
