import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MapaMapboxPage } from './../mapa-mapbox/mapa-mapbox.page';
import { IonicModule } from '@ionic/angular';

import { PedidoPageRoutingModule } from './pedido-routing.module';

import { PedidoPage } from './pedido.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PedidoPageRoutingModule
  ],
  declarations: [PedidoPage]
})
export class PedidoPageModule {}
