import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { CardProductosComponent } from "./card-productos/card-productos.component";
import { DetallesProductosPage } from "src/app/pages/detalles-productos/detalles-productos.page";
import { PopinfoComponent } from './popinfo/popinfo.component';
import { CardCarritoComponent } from "./card-carrito/card-carrito.component";
import { FavoriteProductoComponent } from "./favorite-producto/favorite-producto.component"
//import { FavoriteTabComponent } from './favorite-tab/favorite-tab.component';




@NgModule({
  declarations: [
    CardProductosComponent,
    DetallesProductosPage,
    PopinfoComponent,
    CardCarritoComponent,
    FavoriteProductoComponent,
   // FavoriteTabComponent
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
  //  FavoriteTabComponent
  ],
  entryComponents: [
    DetallesProductosPage
  ]
})
export class CommonsComponentsModule { }
