import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { CardProductosComponent } from "./card-productos/card-productos.component";
import { DetallesProductosPage } from "src/app/pages/detalles-productos/detalles-productos.page";
import { PopinfoComponent } from './popinfo/popinfo.component';

@NgModule({
  declarations: [
    CardProductosComponent,
    DetallesProductosPage,
    PopinfoComponent
  ],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports: [
    CardProductosComponent,
    PopinfoComponent
  ],
  entryComponents: [
    DetallesProductosPage
  ]
})
export class CommonsComponentsModule { }
