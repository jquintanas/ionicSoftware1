import { Component, OnInit, OnDestroy } from '@angular/core';
import { BusquedaService } from 'src/app/services/comunicacion/busqueda.service';
import { detalleProducto } from "src/app/interface/productoDetalle";
import { CarritoService } from "src/app/services/cart/carrito.service";
import { environment } from "src/environments/environment";
@Component({
  selector: 'app-postres',
  templateUrl: './postres.page.html',
  styleUrls: ['./postres.page.scss'],
})
export class PostresPage implements OnInit, OnDestroy {
  private subsDatos: any;
  private categoria = environment.codigoCategoriaPostres;
  dataPostres: detalleProducto[] = [
    {
      ImagenP: "",
      Titulo: "",
      Descripcion: "",
      Precio: 0,
      Favorito: false,
      id: "1",
      carrusel:["https://recetasfacil.online/wp-content/uploads/2018/06/postres-sin-horno-1.jpg", "https://cdn.aarp.net/content/dam/aarp/food/recipes/2018/10/1140-limofresa-gas-drink-esp.jpg", "https://i2.wp.com/www.diegocoquillat.com/wp-content/uploads/2018/06/tapa_bebidas.png?fit=700%2C336&ssl=1&resize=1280%2C720"],
      categoria: this.categoria
    },
    {
      ImagenP: "",
      Titulo: "",
      Descripcion: "",
      Precio: 0,
      Favorito: true,
      id: "2",
      carrusel:["https://recetasfacil.online/wp-content/uploads/2018/06/postres-sin-horno-1.jpg", "https://cdn.aarp.net/content/dam/aarp/food/recipes/2018/10/1140-limofresa-gas-drink-esp.jpg", "https://i2.wp.com/www.diegocoquillat.com/wp-content/uploads/2018/06/tapa_bebidas.png?fit=700%2C336&ssl=1&resize=1280%2C720"],
      categoria: this.categoria
    },
    {
      ImagenP: "",
      Titulo: "",
      Descripcion: "",
      Precio: 0,
      Favorito: false,
      id: "3",
      carrusel:["https://recetasfacil.online/wp-content/uploads/2018/06/postres-sin-horno-1.jpg", "https://cdn.aarp.net/content/dam/aarp/food/recipes/2018/10/1140-limofresa-gas-drink-esp.jpg", "https://i2.wp.com/www.diegocoquillat.com/wp-content/uploads/2018/06/tapa_bebidas.png?fit=700%2C336&ssl=1&resize=1280%2C720"],
      categoria: this.categoria
    }
  ]
  dataMostrar: any[];

  constructor(private busqueda: BusquedaService, private carrito: CarritoService) {
    this.dataMostrar = this.dataPostres;
  }

  ngOnDestroy(): void {
    console.log("sali")
    this.subsDatos.unsubscribe();
  }
  ngOnInit() {
    this.subsDatos = this.busqueda.busqueda().subscribe((data: string) => {
      if (data != null && data != "" && data != "all") {
        this.dataMostrar = [];
        data = data.toLowerCase();
        for (let i = 0; i < this.dataPostres.length; i++) {
          if (this.dataPostres[i].Titulo.includes(data)) {
            this.dataMostrar.push(this.dataPostres[i]);
          }
        }
        return;
      }
      this.dataMostrar = this.dataPostres;
    }, (err: any) => {
      console.log(err);
    })
  }

}
