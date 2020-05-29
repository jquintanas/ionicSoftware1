import { Component, OnInit, Input } from '@angular/core';
import { ModalController, AlertController } from '@ionic/angular';
import { DetallesProductosPage } from "src/app/pages/detalles-productos/detalles-productos.page";
import { detalleProducto } from "src/app/interface/productoDetalle";
import { CarritoService } from "src/app/services/cart/carrito.service";
import { productoCarrito } from "src/app/interface/productoCarrito";
import { Storage } from '@ionic/storage';
import { environment } from "src/environments/environment";
import { Favoritos } from "src/app/interface/favoritosStorage";
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
    private alertController: AlertController,
    private storage: Storage) { }

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
    };
    this.carrito.observarCarrito().subscribe((data: Map<any, Map<string, productoCarrito>>) => {
      if (data != null) {
        if (data.get(this.detalle.categoria) != null) {
          if (data.get(this.detalle.categoria).get(this.detalle.id) != null) {
            this.cantidad = data.get(this.detalle.categoria).get(this.detalle.id).cantidad;
          }
        }
      }

    });
    this.verificarFavorito();
  }

  marcarFavorito() {
    this.banderaCorazon = !this.banderaCorazon;
    this.detalle.Favorito = this.banderaCorazon;

    console.log("DETALLE ",this.detalle)

    if (this.banderaCorazon) {
      this.storage.get(environment.codigoFavoritos).then((data: Favoritos[]) => {
        if(data){
          if(data.length < 10){
            let tmp: Favoritos = {
              categoria: this.categoria,
              idProducto: this.id,
              url:this.urlImagen,
            };
            if(!this.EstaEnFavoritos(data,tmp)){
              data.push(tmp);
              this.storage.set(environment.codigoFavoritos, data);
            }
          }
        }
        else {
          let tmp: Favoritos = {
            categoria: this.categoria,
            idProducto: this.id,
            url:this.urlImagen
          };
          console.log("tmp ",tmp)
          let arrayTmp: Favoritos[] = [];
          arrayTmp.push(tmp);
          console.log(arrayTmp)
          this.storage.set(environment.codigoFavoritos, arrayTmp);
        }
      }).catch((err: any) => {
        console.log(err);
      })
    }
    else {
      this.storage.get(environment.codigoFavoritos).then((data: Favoritos[]) => {
        if(data){
          let tmp: Favoritos = {
            categoria: this.categoria,
            idProducto: this.id,
            url:this.urlImagen
          };
          let tmpData: Favoritos[] = this.eliminarDeFavoritos(data,tmp);
          this.storage.set(environment.codigoFavoritos,tmpData);
        }
       
      }).catch((err:any) => {
        console.log(err);
      })
    }

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

  private EstaEnFavoritos(data: Favoritos[], producto: Favoritos){
    for(let i=0; i<data.length;i++){
      if(data[i].categoria == producto.categoria && data[i].idProducto == producto.idProducto){
        return true;
      }
    }
    return false;
  }

  private eliminarDeFavoritos(data : Favoritos[], producto: Favoritos){
    let tmp: Favoritos[] = [];
    for(let i=0; i<data.length;i++){
      if(data[i].categoria == producto.categoria && data[i].idProducto != producto.idProducto){
        tmp.push(data[i])
      }
    }
    return tmp;
  }

  private verificarFavorito(){
    this.storage.get(environment.codigoFavoritos).then((data: Favoritos[]) => {
      let tmp: Favoritos = {
        categoria: this.categoria,
        idProducto: this.id,
        url:this.urlImagen
      }
      this.banderaCorazon = this.EstaEnFavoritos(data,tmp);
    }).catch((err:any) => {
      console.log(err);
    })
  }


}
