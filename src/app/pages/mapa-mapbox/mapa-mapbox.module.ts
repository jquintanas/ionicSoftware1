import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { MapaMapboxPageRoutingModule } from './mapa-mapbox-routing.module';

import { MapaMapboxPage } from './mapa-mapbox.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MapaMapboxPageRoutingModule,
    
  ],
  declarations: [MapaMapboxPage]
})
export class MapaMapboxPageModule {}
