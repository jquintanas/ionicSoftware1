import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { CardProductosComponent } from "./card-productos/card-productos.component";
import { DetallesProductosPage } from "src/app/pages/detalles-productos/detalles-productos.page";
import { PopinfoComponent } from './popinfo/popinfo.component';
import { CardCarritoComponent } from "./card-carrito/card-carrito.component";
@NgModule({
  declarations: [
    CardProductosComponent,
    DetallesProductosPage,
    PopinfoComponent,
    CardCarritoComponent
  ],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports: [
    CardProductosComponent,
    PopinfoComponent,
    CardCarritoComponent
  ],
  entryComponents: [
    DetallesProductosPage
  ]
})
export class CommonsComponentsModule { }
