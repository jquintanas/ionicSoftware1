import { Component, OnInit, OnDestroy } from '@angular/core';
import { BusquedaService } from "src/app/core/services/comunicacion/busqueda.service";
import { DetalleProducto } from "src/app/core/interface/productoDetalle";
import { environment } from "src/environments/environment";
import { ProductosService } from 'src/app/core/services/cart/productos.service';
import { AlertsService } from 'src/app/core/services/alerts/alerts.service';
@Component({
  selector: 'app-bebidas',
  templateUrl: './bebidas.page.html',
  styleUrls: ['./bebidas.page.scss'],
})
export class BebidasPage implements OnInit, OnDestroy {
  private subsDatos: any;
  private subProductos: any;
  private subCategorias: any;
  private categoria: string;
  dataBebidas: DetalleProducto[] = [
    {
      ImagenP: "https://cdn.aarp.net/content/dam/aarp/food/recipes/2018/10/1140-limofresa-gas-drink-esp.jpg",
      Titulo: "jugo de fresa",
      Descripcion: "Un jugo muy rico de fresa.",
      Precio: 10,
      Favorito: false,
      carrusel: ["https://recetasfacil.online/wp-content/uploads/2018/06/postres-sin-horno-1.jpg", "https://cdn.aarp.net/content/dam/aarp/food/recipes/2018/10/1140-limofresa-gas-drink-esp.jpg", "https://i2.wp.com/www.diegocoquillat.com/wp-content/uploads/2018/06/tapa_bebidas.png?fit=700%2C336&ssl=1&resize=1280%2C720"],
      id: "1",
      categoria: 1
    },
    {
      ImagenP: "",
      Titulo: "",
      Descripcion: "vino tinto muy rico.",
      Precio: 0,
      Favorito: true,
      carrusel: ["https://recetasfacil.online/wp-content/uploads/2018/06/postres-sin-horno-1.jpg", "https://cdn.aarp.net/content/dam/aarp/food/recipes/2018/10/1140-limofresa-gas-drink-esp.jpg", "https://i2.wp.com/www.diegocoquillat.com/wp-content/uploads/2018/06/tapa_bebidas.png?fit=700%2C336&ssl=1&resize=1280%2C720"],
      id: "2",
      categoria: 1
    },
    {
      ImagenP: "https://i2.wp.com/www.diegocoquillat.com/wp-content/uploads/2018/06/tapa_bebidas.png?fit=700%2C336&ssl=1&resize=1280%2C720",
      Titulo: "limonada",
      Descripcion: "",
      Precio: 2.5,
      Favorito: false,
      carrusel: ["https://recetasfacil.online/wp-content/uploads/2018/06/postres-sin-horno-1.jpg", "https://cdn.aarp.net/content/dam/aarp/food/recipes/2018/10/1140-limofresa-gas-drink-esp.jpg", "https://i2.wp.com/www.diegocoquillat.com/wp-content/uploads/2018/06/tapa_bebidas.png?fit=700%2C336&ssl=1&resize=1280%2C720"],
      id: "3",
      categoria: 1
    }
  ];
  dataMostrar: any[];

  constructor(
    private busqueda: BusquedaService,
    private productosServices: ProductosService,
    private alertService: AlertsService) {
    this.dataMostrar = this.dataBebidas;
  }
  ngOnDestroy(): void {
    this.subsDatos.unsubscribe();
    this.subProductos.unsubscribe();
    this.subCategorias.unsubscribe();
  }

  ngOnInit() {
    this.subsDatos = this.busqueda.busqueda().subscribe((data: string) => {
      if (data != null && data != "" && data != "all") {
        this.dataMostrar = [];
        data = data.toLowerCase();
        // tslint:disable-next-line: prefer-for-of
        for (let i = 0; i < this.dataBebidas.length; i++) {
          if (this.dataBebidas[i].Titulo.includes(data)) {
            this.dataMostrar.push(this.dataBebidas[i]);
          }
        }
        return;
      }
      this.dataMostrar = this.dataBebidas;
    }, (err: any) => {
      console.log(err);
    });

    this.subCategorias = this.productosServices.onservarCategorias().subscribe(
      data => {
        if (data) {
          this.categoria = this.productosServices.mapaCategorias.get(environment.nombresCategorias.bebidas).idCategoria;
          this.subProductos = this.productosServices.obtenerProductosPorCategoria(this.categoria).subscribe(
            dt => {
              console.log(dt);
            },
            async err => {
              console.log(err);
              await this.alertService.mostrarToastError();
            }
          );
        }
      },
      async err => {
        console.log(err);
        await this.alertService.mostrarToastError();
      }
    );
  }

}
