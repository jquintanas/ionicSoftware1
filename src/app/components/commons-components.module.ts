import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { CardProductosComponent } from "./card-productos/card-productos.component";
import { DetallesProductosPage } from "src/app/pages/detalles-productos/detalles-productos.page";
import { PopinfoComponent } from './popinfo/popinfo.component';
import { CardCarritoComponent } from "./card-carrito/card-carrito.component";
import { FavoriteProductoComponent } from "./favorite-producto/favorite-producto.component"
import { SliderRecomendadosComponent } from "./slider-recomendados/slider-recomendados.component";
import { AccordionComponent } from './accordion/accordion.component';



@NgModule({
  declarations: [
    CardProductosComponent,
    DetallesProductosPage,
    PopinfoComponent,
    CardCarritoComponent,
    FavoriteProductoComponent,
    SliderRecomendadosComponent,
    AccordionComponent
  ],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports: [
    CardProductosComponent,
    PopinfoComponent,
    CardCarritoComponent,
    FavoriteProductoComponent,
    SliderRecomendadosComponent,
    AccordionComponent
  ],
  entryComponents: [
    DetallesProductosPage
  ]
})
export class CommonsComponentsModule { }
