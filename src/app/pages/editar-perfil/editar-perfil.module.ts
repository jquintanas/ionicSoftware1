import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditarPerfilPageRoutingModule } from './editar-perfil-routing.module';

import { EditarPerfilPage } from './editar-perfil.page';
import { MapaMapboxPageModule } from "src/app/pages/mapa-mapbox/mapa-mapbox.module";
@NgModule({
  imports: [
    ReactiveFormsModule,
    CommonModule,
    FormsModule,
    IonicModule,
    EditarPerfilPageRoutingModule,
    MapaMapboxPageModule
  ],
  declarations: [EditarPerfilPage],
  entryComponents: []

})
export class EditarPerfilPageModule { }
