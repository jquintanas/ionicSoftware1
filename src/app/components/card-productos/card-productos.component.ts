import { Component, OnInit, Input } from '@angular/core';
import { ModalController, AlertController } from '@ionic/angular';
import { DetallesProductosPage } from "src/app/pages/detalles-productos/detalles-productos.page";
import { detalleProducto } from "src/app/interface/productoDetalle";
import { CarritoService } from "src/app/services/cart/carrito.service";
import { productoCarrito } from "src/app/interface/productoCarrito";

@Component({
  selector: 'app-card-productos',
  templateUrl: './card-productos.component.html',
  styleUrls: ['./card-productos.component.scss'],
})
export class CardProductosComponent implements OnInit {

  //variables de entrada
  @Input("Imagen") urlImagen: string;
  @Input("carrusel") carrusel: string[];
  @Input("Titulo") titulo: string;
  @Input("Descripcion") descripcion: string;
  @Input("Precio") precio: number;
  @Input("Favorito") banderaCorazon: boolean;
  @Input("id") id: string;
  @Input("categoria") categoria: number;

  //variables internas
  private banderaLoading: boolean = true;
  private detalle: detalleProducto;
  private cantidad: number = 0;
  abstract: string = "";
  constructor(
    private modalController: ModalController,
    private carrito: CarritoService,
    private alertController: AlertController) { }

  ngOnInit() {
    if (this.titulo == null || this.titulo == "") {
      this.titulo = "Cargando...";
    }
    if (this.descripcion == null || this.descripcion == "") {
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
    }
    this.carrito.observarCarrito().subscribe((data: Map<any, Map<string, productoCarrito>>) => {
      if (data != null) {
        if (data.get(this.detalle.categoria) != null) {
          if (data.get(this.detalle.categoria).get(this.detalle.id) != null) {
            this.cantidad = data.get(this.detalle.categoria).get(this.detalle.id).cantidad;
          }
        }
      }

    })
  }

  marcarFavorito() {
    this.banderaCorazon = !this.banderaCorazon;
    this.detalle.Favorito = this.banderaCorazon;
  }

  async agregarAlCarrito() {
    let cantida = await this.presentAlertPrompt();
    if (cantida > 0) {
      this.cantidad += cantida;
      this.detalle.cantidad = this.cantidad;
      let tmp: productoCarrito = {
        cantidad: cantida,
        id: this.detalle.id,
        producto: this.detalle
      }
      this.carrito.agregarAlCarrito(this.detalle.categoria, tmp);
    }
  }

  private crearAbstract() {
    let tmp = this.descripcion.split(" ");
    if (tmp.length > 7) {
      for (let i = 0; i < 7; i++) {
        this.abstract += tmp[i] + " ";
      }
      this.abstract += "..."
      return;
    }
    this.abstract = this.descripcion;
  }

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
    let alert = await this.alertController.create({
      header: 'Ingrese la cantidad a comprar',
      inputs: [
        {
          name: 'cantidad',
          type: 'number',
          placeholder: 'Cantidad..'
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
    let { data } = await alert.onDidDismiss();
    if (data) {
      if (data.values.cantidad == "") {
        return 0;
      }
      return Number(data.values.cantidad);
    }
    return 0;
  }


}
