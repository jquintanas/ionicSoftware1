import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { CardProductosComponent } from "./card-productos/card-productos.component";
import { ModelDetallesComponent } from "./model-detalles/model-detalles.component";
import { DetallesProductosPage } from "src/app/pages/detalles-productos/detalles-productos.page";
@NgModule({
  declarations: [
    CardProductosComponent,
    ModelDetallesComponent,
    DetallesProductosPage
  ],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports: [
    CardProductosComponent,
    ModelDetallesComponent
  ],
  entryComponents: [
    DetallesProductosPage
  ]
})
export class CommonsComponentsModule { }
