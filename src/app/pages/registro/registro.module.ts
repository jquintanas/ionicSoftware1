import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule  } from '@angular/forms';
//import { MapaMapboxPage } from './../mapa-mapbox/mapa-mapbox.page';
import { IonicModule } from '@ionic/angular';
import { HttpClientModule } from '@angular/common/http';
import { RegistroPageRoutingModule } from './registro-routing.module';

import { RegistroPage } from './registro.page';
import { MapaMapboxPageModule } from "src/app/pages/mapa-mapbox/mapa-mapbox.module";
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RegistroPageRoutingModule,
    ReactiveFormsModule,
    MapaMapboxPageModule,
    HttpClientModule
  ],
  declarations: [RegistroPage],
  entryComponents: []
})
export class RegistroPageModule {}
