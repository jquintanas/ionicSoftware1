import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { PedidoPageRoutingModule } from './pedido-routing.module';
import { MapaMapboxPageModule } from "src/app/pages/mapa-mapbox/mapa-mapbox.module";
import { PedidoPage } from './pedido.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PedidoPageRoutingModule,
    MapaMapboxPageModule,
    HttpClientModule
  ],
  declarations: [PedidoPage]
})
export class PedidoPageModule {}
