import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CarritoComprasPageRoutingModule } from './carrito-compras-routing.module';

import { CarritoComprasPage } from './carrito-compras.page';
import { CommonsComponentsModule } from "src/app/components/commons-components.module";
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CarritoComprasPageRoutingModule,
    CommonsComponentsModule
  ],
  declarations: [CarritoComprasPage]
})
export class CarritoComprasPageModule {}
