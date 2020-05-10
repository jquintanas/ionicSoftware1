import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { DetallesProductosPage } from "src/app/pages/detalles-productos/detalles-productos.page";
@Component({
  selector: 'app-card-productos',
  templateUrl: './card-productos.component.html',
  styleUrls: ['./card-productos.component.scss'],
})
export class CardProductosComponent implements OnInit {

  //variables de entrada
  @Input("Imagen") urlImagen: string;
  @Input("Titulo") titulo: string;
  @Input("Descripcion") descripcion: string;
  @Input("Precio") precio: number;
  @Input("Favorito") banderaCorazon: boolean;
  @Input("esPar") banderaColor : boolean;

  //variables internas
  abstract: string = "";
  constructor(private modalController: ModalController) { }

  ngOnInit() {
    //this.urlImagen = "https://recetasfacil.online/wp-content/uploads/2018/06/postres-sin-horno-1.jpg";
    if(this.titulo == null || this.titulo == ""){
      this.titulo = "Cargando...";
    }
    if(this.descripcion == null || this.descripcion == ""){
      this.descripcion = "Cargando...";
    }
    if(this.precio == null){
      this.precio = 0;
    }
    this.crearAbstract();
  }

  marcarFavorito() {
    this.banderaCorazon = !this.banderaCorazon;
  }

  agregarAlCarrito(){
    console.log("agregado")
  }

  private crearAbstract(){
    let tmp = this.descripcion.split(" ");
    if(tmp.length > 5){
      for(let i=0; i<5;i++){
        this.abstract += tmp[i] + " ";
      }
      this.abstract += "..."
      return;
    }
    this.abstract = this.descripcion;
  }

  async abrirDetalles(){
    const modal = await this.modalController.create({
      component: DetallesProductosPage
    });
    await modal.present();
  }

}
