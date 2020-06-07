import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PerfilUsuarioPageRoutingModule } from './perfil-usuario-routing.module';
//import {HidenavModule} from 'ionic4-hidenav';
import { PerfilUsuarioPage } from './perfil-usuario.page';
import { CommonsComponentsModule } from "src/app/components/commons-components.module";
import {SharedModule} from '../../shared/shared.module'

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PerfilUsuarioPageRoutingModule,
    CommonsComponentsModule,
    SharedModule
  ],
  declarations: [PerfilUsuarioPage],
 // exports: [HidenavModule]
})
export class PerfilUsuarioPageModule {}



