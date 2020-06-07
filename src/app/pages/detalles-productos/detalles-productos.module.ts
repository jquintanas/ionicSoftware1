import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetallesProductosPageRoutingModule } from './detalles-productos-routing.module';

import { DetallesProductosPage } from './detalles-productos.page';
import { CommonsComponentsModule } from "src/app/components/commons-components.module";
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetallesProductosPageRoutingModule,
    CommonsComponentsModule
  ],
  declarations: [DetallesProductosPage],
  entryComponents: [DetallesProductosPage],
  exports: [DetallesProductosPage]
})
export class DetallesProductosPageModule {}
