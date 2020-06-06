import { MapaMapboxPage } from './../mapa-mapbox/mapa-mapbox.page';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditarPerfilPageRoutingModule } from './editar-perfil-routing.module';

import { EditarPerfilPage } from './editar-perfil.page';
@NgModule({
  imports: [
    ReactiveFormsModule,
    CommonModule,
    FormsModule,
    IonicModule,
    EditarPerfilPageRoutingModule
  ],
  declarations: [EditarPerfilPage,MapaMapboxPage],
  entryComponents: [MapaMapboxPage]
 
})
export class EditarPerfilPageModule {}
