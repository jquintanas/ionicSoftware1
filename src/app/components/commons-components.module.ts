import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { CardProductosComponent } from "./card-productos/card-productos.component";
import { DetallesProductosPage } from "src/app/pages/detalles-productos/detalles-productos.page";
@NgModule({
  declarations: [
    CardProductosComponent,
    DetallesProductosPage
  ],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports: [
    CardProductosComponent,
  ],
  entryComponents: [
    DetallesProductosPage
  ]
})
export class CommonsComponentsModule { }
