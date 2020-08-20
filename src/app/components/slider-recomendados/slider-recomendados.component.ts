import { Component, OnInit, OnDestroy } from '@angular/core';
import { environment } from "src/environments/environment";
import { ProductosService } from 'src/app/core/services/cart/productos.service';
import { Productos } from 'src/app/core/interface/modelNOSQL/productos';
@Component({
  selector: 'app-slider-recomendados',
  templateUrl: './slider-recomendados.component.html',
  styleUrls: ['./slider-recomendados.component.scss'],
})
export class SliderRecomendadosComponent implements OnInit, OnDestroy {
  private subProductos: any;
  private subCategorias: any;
  private categoria: string;
  dataPromociones: Productos[];
  slideOpts = {
    initialSlide: 0,
    speed: 400,
    autoplay: false,
    setWrapperSize: true,
    slidesPerView: 1.5
  };


  constructor(private productosServices: ProductosService) { }
  ngOnDestroy(): void {
    if (this.subProductos) {
      this.subProductos.unsubscribe();
    }
    if (this.subCategorias) {
      this.subCategorias.unsubscribe();
    }
  }

  ngOnInit() {
    this.observadorProductos();
  }

  private observadorProductos() {
    this.subCategorias = this.productosServices.onservarCategorias().subscribe(
      data => {
        if (data) {
          this.categoria = this.productosServices.mapaCategorias.get(environment.nombresCategorias.promociones).idCategoria;
          this.subProductos = this.productosServices.obtenerProductosPorCategoria(this.categoria).subscribe(
            dt => {
              console.log(dt);
              this.dataPromociones = dt;
            },
            async err => {
              console.log(err);
            }
          );
        }
      },
      async err => {
        console.log(err);
      }
    );
  }
}
