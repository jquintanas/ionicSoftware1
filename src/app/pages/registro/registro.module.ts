import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule  } from '@angular/forms';
import { MapaMapboxPage } from './../mapa-mapbox/mapa-mapbox.page';
import { IonicModule } from '@ionic/angular';

import { RegistroPageRoutingModule } from './registro-routing.module';

import { RegistroPage } from './registro.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RegistroPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [RegistroPage,MapaMapboxPage],
  entryComponents: [MapaMapboxPage]
})
export class RegistroPageModule {}
