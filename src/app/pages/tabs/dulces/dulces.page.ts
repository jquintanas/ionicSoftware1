import { Component, OnInit, OnDestroy } from '@angular/core';
import { BusquedaService } from "src/app/services/comunicacion/busqueda.service";
import { detalleProducto } from "src/app/interface/productoDetalle";
import { environment } from "src/environments/environment";
@Component({
  selector: 'app-dulces',
  templateUrl: './dulces.page.html',
  styleUrls: ['./dulces.page.scss'],
})
export class DulcesPage implements OnInit, OnDestroy {
  private subsDatos: any;
  private categoria: number = environment.codigoCategoriaDulces;
  dataDulces: detalleProducto[] = [
    {
      ImagenP: "https://i.ytimg.com/vi/AKC-mXZ2ZRQ/maxresdefault.jpg",
      Titulo: "nutella",
      Descripcion: "Nutella con M&M",
      Precio: 5,
      Favorito: false,
      id: "1",
      carrusel: ["https://recetasfacil.online/wp-content/uploads/2018/06/postres-sin-horno-1.jpg", "https://cdn.aarp.net/content/dam/aarp/food/recipes/2018/10/1140-limofresa-gas-drink-esp.jpg", "https://i2.wp.com/www.diegocoquillat.com/wp-content/uploads/2018/06/tapa_bebidas.png?fit=700%2C336&ssl=1&resize=1280%2C720"],
      categoria: this.categoria
    },
    {
      ImagenP: "https://www.65ymas.com/uploads/s1/12/15/48/europapress-1269237-dulce-dulces-pastel-pasteles-pastelitos-pastelito-comida-comidas-postre-postres-donut-donuts.jpeg",
      Titulo: "donas",
      Descripcion: "Donas surtidas",
      Precio: 1.25,
      Favorito: true,
      id: "2",
      carrusel: ["https://recetasfacil.online/wp-content/uploads/2018/06/postres-sin-horno-1.jpg", "https://cdn.aarp.net/content/dam/aarp/food/recipes/2018/10/1140-limofresa-gas-drink-esp.jpg", "https://i2.wp.com/www.diegocoquillat.com/wp-content/uploads/2018/06/tapa_bebidas.png?fit=700%2C336&ssl=1&resize=1280%2C720"],
      categoria: this.categoria
    },
    {
      ImagenP: "https://eldiariony.com/wp-content/uploads/sites/2/2017/05/gomitas.jpg?quality=60&strip=all&w=940",
      Titulo: "gomitas",
      Descripcion: "Gomitas de sabores por libra",
      Precio: 2.5,
      Favorito: false,
      id: "3",
      carrusel: ["https://recetasfacil.online/wp-content/uploads/2018/06/postres-sin-horno-1.jpg", "https://cdn.aarp.net/content/dam/aarp/food/recipes/2018/10/1140-limofresa-gas-drink-esp.jpg", "https://i2.wp.com/www.diegocoquillat.com/wp-content/uploads/2018/06/tapa_bebidas.png?fit=700%2C336&ssl=1&resize=1280%2C720"],
      categoria: this.categoria
    }
  ]
  dataMostrar: any[];
  constructor(private busqueda: BusquedaService) {
    this.dataMostrar = this.dataDulces;
  }

  ngOnDestroy(): void {
    this.subsDatos.unsubscribe();
  }


  ngOnInit() {
    this.subsDatos = this.busqueda.busqueda().subscribe((data: string) => {
      if (data != null && data != "" && data != "all") {
        this.dataMostrar = [];
        data = data.toLowerCase();
        for (let i = 0; i < this.dataDulces.length; i++) {
          if (this.dataDulces[i].Titulo.includes(data)) {
            this.dataMostrar.push(this.dataDulces[i]);
          }
        }
        return;
      }
      this.dataMostrar = this.dataDulces;
    }, (err: any) => {
      console.log(err);
    })
  }

}
