import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CambioContrasenaPageRoutingModule } from './cambio-contrasena-routing.module';

import { CambioContrasenaPage } from './cambio-contrasena.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CambioContrasenaPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [CambioContrasenaPage]
})
export class CambioContrasenaPageModule {}
