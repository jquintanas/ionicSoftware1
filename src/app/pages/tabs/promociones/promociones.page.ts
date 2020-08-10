import { Component, OnInit, OnDestroy } from '@angular/core';
import { BusquedaService } from 'src/app/core/services/comunicacion/busqueda.service';
import { environment } from "src/environments/environment";
import { Productos } from "src/app/core/interface/modelNOSQL/productos";
import { LoadingController } from '@ionic/angular';
import { ProductosService } from 'src/app/core/services/cart/productos.service';
import { AlertsService } from 'src/app/core/services/alerts/alerts.service';
@Component({
  selector: 'app-promociones',
  templateUrl: './promociones.page.html',
  styleUrls: ['./promociones.page.scss'],
})
export class PromocionesPage implements OnInit, OnDestroy {
  private subsDatos: any;
  private subProductos: any;
  private subCategorias: any;
  private categoria: string;
  dataPromociones: Productos[];
  dataMostrar: any[];

  constructor(
    private busqueda: BusquedaService,
    private loadinController: LoadingController,
    private productosServices: ProductosService,
    private alertService: AlertsService
  ) {
  }

  ngOnDestroy(): void {
    if (this.subsDatos) {
      this.subsDatos.unsubscribe();
    }
    if (this.subProductos) {
      this.subProductos.unsubscribe();
    }
    if (this.subCategorias) {
      this.subCategorias.unsubscribe();
    }
  }


  async ngOnInit() {
    this.observadorBusqueda();
    await this.observadorProductos();
    this.busqueda.cambioTab(4);
  }

  private observadorBusqueda() {
    this.subsDatos = this.busqueda.busqueda().subscribe((data: string) => {
      if (data != null && data != "" && data != "all") {
        this.dataMostrar = [];
        data = data.toLowerCase();
        // tslint:disable-next-line: prefer-for-of
        for (let i = 0; i < this.dataPromociones.length; i++) {
          if (this.dataPromociones[i].nombre.includes(data)) {
            this.dataMostrar.push(this.dataPromociones[i]);
          }
        }
        return;
      }
      this.dataMostrar = this.dataPromociones;
    }, (err: any) => {
      console.log(err);
    });
  }

  private async observadorProductos() {
    const loading = await this.loadinController.create({ message: "Cargando..." });
    await loading.present();
    this.subCategorias = this.productosServices.onservarCategorias().subscribe(
      data => {
        if (data) {
          this.categoria = this.productosServices.mapaCategorias.get(environment.nombresCategorias.promociones).idCategoria;
          this.subProductos = this.productosServices.obtenerProductosPorCategoria(this.categoria).subscribe(
            dt => {
              console.log(dt);
              this.dataPromociones = dt;
              this.dataMostrar = dt;
              loading.dismiss();
            },
            async err => {
              console.log(err);
              loading.dismiss();
              await this.alertService.mostrarToastError();
            }
          );
        }
      },
      async err => {
        console.log(err);
        loading.dismiss();
        await this.alertService.mostrarToastError();
      }
    );
  }
}
