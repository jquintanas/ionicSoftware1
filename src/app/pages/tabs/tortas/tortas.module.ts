import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TortasPageRoutingModule } from './tortas-routing.module';

import { TortasPage } from './tortas.page';
import { CommonsComponentsModule } from "src/app/components/commons-components.module";
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TortasPageRoutingModule,
    CommonsComponentsModule
  ],
  declarations: [TortasPage]
})
export class TortasPageModule {}
