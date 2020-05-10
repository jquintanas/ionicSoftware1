import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DulcesPageRoutingModule } from './dulces-routing.module';

import { DulcesPage } from './dulces.page';
import { CommonsComponentsModule } from "src/app/components/commons-components.module";
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DulcesPageRoutingModule,
    CommonsComponentsModule
  ],
  declarations: [DulcesPage]
})
export class DulcesPageModule {}
